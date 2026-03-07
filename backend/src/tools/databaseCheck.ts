import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { DocumentCreationRequest } from "../models/DocumentCreationRequest.js";
import mongoose from "mongoose";

export const databaseCheckTool = tool(
  async ({ query, documentId }) => {
    try {
      console.log(`--- Database Check Tool ---`);
      console.log(`Query: ${query}, ID: ${documentId}`);

      // 1. Search by exact ID if provided (from QR code)
      if (documentId && mongoose.Types.ObjectId.isValid(documentId)) {
        const docById = await DocumentCreationRequest.findById(documentId).populate('organizationId', 'name');
        if (docById) {
          return JSON.stringify({
            verified: true,
            source: "Official Institution Records",
            matchType: "Exact ID Match",
            record: {
              issuer: docById.organizationId,
              type: docById.documentModelName,
              data: docById.formData,
              date: docById.createdAt
            }
          });
        }
      }

      // 2. Search by content (fuzzy/text search)
      const allDocs = await DocumentCreationRequest.find().populate('organizationId', 'name');
      
      // Filter matches by content
      const potentialMatches = allDocs.filter(doc => {
        const values = Object.values(doc.formData).map(v => String(v).toLowerCase());
        return values.some(v => query.toLowerCase().includes(v) || v.includes(query.toLowerCase()));
      });

      if (potentialMatches.length > 0) {
        // If we found multiple people with same name, return all potential records
        // This helps the AI reason about which institution is the correct one
        return JSON.stringify({
          verified: true,
          source: "Official Institution Records",
          matchType: "Content Match",
          matches: potentialMatches.map(m => ({
            issuer: m.organizationId,
            type: m.documentModelName,
            data: m.formData
          }))
        });
      }

      return JSON.stringify({
        verified: false,
        reason: "No matching record found in official issuance records."
      });
    } catch (error: any) {
      return `Database Error: ${error.message}`;
    }
  },
  {
    name: "database_check_tool",
    description: "Verify document data against the official issuance database using a text query or a specific document ID.",
    schema: z.object({
      query: z.string().describe("A string containing names, serial numbers, or other text found in the document."),
      documentId: z.string().optional().describe("The specific database ID of the document (usually found in a QR code)."),
    }),
  }
);
