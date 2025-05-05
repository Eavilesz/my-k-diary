"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function KDramaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    rating: 5,
    review: "",
    status: "Viendo",
    tags: ["Romántico"],
  });

  // Form submission handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "kdramas"), postData);
      console.log("Document written with ID: ", docRef.id);

      // Redirect to admin page
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating post. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title input */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Título del Drama
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* Cover image URL */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          URL de la Imagen de Portada
        </label>
        <input
          type="url"
          value={formData.coverImage}
          onChange={(e) =>
            setFormData({ ...formData, coverImage: e.target.value })
          }
          required
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        {formData.coverImage && (
          <div className="mt-2 relative w-32 h-48">
            <Image
              src={formData.coverImage}
              alt="Cover preview"
              fill
              sizes="128px"
              style={{ objectFit: "cover" }}
              className="rounded shadow-md"
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Calificación
        </label>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: parseFloat(e.target.value) })
            }
            className="w-full"
          />
          <span className="ml-2">{formData.rating}</span>
        </div>
      </div>

      {/* Review text */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Reseña</label>
        <textarea
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="w-full rounded-md border border-gray-300 p-2 h-32"
          required
        ></textarea>
      </div>

      {/* Status selector */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Estado</label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as any })
          }
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="Viendo">Viendo</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Abandonado">Abandonado</option>
        </select>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors disabled:bg-gray-400"
        >
          {loading ? "Guardando..." : "Crear K-Drama"}
        </button>
      </div>
    </form>
  );
}
