import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input
from tensorflow.keras.models import Model
from tensorflow.keras.applications import EfficientNetV2B0
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
import warnings
from typing import Tuple

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warnings.filterwarnings("ignore", category=FutureWarning)

class ImageComparator:
    """
    A class to encapsulate image comparison logic using the highly efficient
    EfficientNetV2B0 model. The model is loaded only once upon initialization.
    """
    def __init__(self, img_size: Tuple[int, int] = (224, 224)):
        self.img_size = img_size
        self.model = self._load_model()

    def _load_model(self):
        """Loads the EfficientNetV2B0 model."""
        print("🔹 TensorFlow version:", tf.__version__)
        print("\n🚀 Loading EfficientNetV2B0...")
        
        input_tensor = Input(shape=(self.img_size[0], self.img_size[1], 3))
        
        base_model = EfficientNetV2B0(
            weights="imagenet", 
            include_top=False, 
            pooling="avg",
            input_tensor=input_tensor
        )
        
        print("✅ Model loaded successfully.\n")
        return base_model

    def _load_and_preprocess_image(self, img_path: str) -> np.ndarray:
        """Loads an image, resizes it, and preprocesses it for the model."""
        if not os.path.exists(img_path):
            raise FileNotFoundError(f"❌ Image not found at path: {img_path}")
        
        img = Image.open(img_path).convert("RGB")
        img = img.resize(self.img_size, Image.Resampling.LANCZOS)
        img_array = np.expand_dims(np.array(img), axis=0)
        
        return preprocess_input(img_array)

    def get_embedding(self, img_path: str) -> np.ndarray:
        """Generates a feature vector (embedding) for a single image."""
        img_array = self._load_and_preprocess_image(img_path)
        embedding = self.model.predict(img_array, verbose=0)
        return embedding.flatten()

    def compare_two_images(self, image1_path: str, image2_path: str) -> float:
        """Compares two images and returns a similarity score from 0 to 100."""
        print(f"\n📷 Comparing:\n 1️⃣  {image1_path}\n 2️⃣  {image2_path}\n")
        
        emb1 = self.get_embedding(image1_path)
        emb2 = self.get_embedding(image2_path)
        
        similarity = cosine_similarity([emb1], [emb2])[0][0]
        percentage = max(0, ((similarity + 1) / 2) * 100)
        
        print(f"🧠 Cosine Similarity: {similarity:.4f}")
        print(f"✅ Similarity Score: {percentage:.2f}%")
        return percentage
