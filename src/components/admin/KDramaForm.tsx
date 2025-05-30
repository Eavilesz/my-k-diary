"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KDramaPost } from "@/lib/posts";

interface KDramaFormProps {
  initialData?: KDramaPost;
  isEditing?: boolean;
  postId?: string;
}

export default function KDramaForm({
  initialData,
  isEditing = false,
  postId,
}: KDramaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initialize form data with either initialData or default values
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    coverImage: initialData?.coverImage || "",
    rating: initialData?.rating || 5,
    review: initialData?.review || "",
    status: initialData?.status || "Viendo",
    tags: initialData?.tags || ["Romántico"],
    favoriteQuote: initialData?.favoriteQuote || "",
    whereToWatch: initialData?.whereToWatch || [
      { platform: "Netflix", url: "", icon: "netflix" },
    ],
    koreanCrush: initialData?.koreanCrush || {
      name: "",
      image: "",
    },
    song: initialData?.song || {
      title: "",
      artist: "",
      youtubeUrl: "",
    },
  });

  // Form submission handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Saving data:", postData);

      const url = isEditing ? `/api/posts/${postId}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      // Send to API route
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} post`);
      }

      const result = await response.json();
      console.log(
        `Post ${isEditing ? "updated" : "created"} with ID: `,
        result.id
      );

      // Redirect to admin page
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} post: `,
        error
      );
      alert(
        `Error ${
          isEditing ? "updating" : "creating"
        } post. Check console for details.`
      );
    } finally {
      setLoading(false);
    }
  }

  // Add platform
  const addPlatform = () => {
    setFormData({
      ...formData,
      whereToWatch: [
        ...formData.whereToWatch,
        { platform: "Netflix", url: "", icon: "netflix" },
      ],
    });
  };

  // Remove platform
  const removePlatform = (index: number) => {
    const updatedPlatforms = [...formData.whereToWatch];
    updatedPlatforms.splice(index, 1);
    setFormData({
      ...formData,
      whereToWatch: updatedPlatforms,
    });
  };

  // Update platform field
  const updatePlatform = (index: number, field: string, value: string) => {
    const updatedPlatforms = [...formData.whereToWatch];
    updatedPlatforms[index] = {
      ...updatedPlatforms[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      whereToWatch: updatedPlatforms,
    });
  };

  // Add tag
  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag) && tag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">
          Información Básica
        </h3>

        {/* Title input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Título del Drama
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Cover image URL */}
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Calificación
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
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

        {/* Status selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Estado</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="Viendo">Viendo</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Abandonado">Abandonado</option>
          </select>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">Reseña</h3>
        <textarea
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="w-full rounded-md border border-gray-300 p-2 h-32"
          required
          placeholder="Escribe tu reseña aquí..."
        ></textarea>
      </div>

      {/* Tags Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">Etiquetas</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-pink-50 text-[#ff8ba7] px-2 py-1 rounded-full"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            id="newTag"
            placeholder="Añadir etiqueta..."
            className="flex-grow rounded-l-md border border-gray-300 p-2"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                addTag(input.value);
                input.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "newTag"
              ) as HTMLInputElement;
              addTag(input.value);
              input.value = "";
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-md px-4"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* Where to Watch Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">Dónde Ver</h3>

        {formData.whereToWatch.map((platform, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-100 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Plataforma #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removePlatform(index)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>

            {/* Platform name */}
            <div className="mb-2">
              <label className="block text-sm text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={platform.platform}
                onChange={(e) =>
                  updatePlatform(index, "platform", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Netflix"
              />
            </div>

            {/* Platform URL */}
            <div className="mb-2">
              <label className="block text-sm text-gray-700 mb-1">URL</label>
              <input
                type="url"
                value={platform.url}
                onChange={(e) => updatePlatform(index, "url", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="https://www.netflix.com/title/123456"
              />
            </div>

            {/* Platform icon */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Icono</label>
              <select
                value={platform.icon}
                onChange={(e) => updatePlatform(index, "icon", e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="netflix">Netflix</option>
                <option value="primevideo">Prime Video</option>
                <option value="viki">Viki</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPlatform}
          className="text-[#ff8ba7] hover:text-[#ff7b9c] font-medium"
        >
          + Añadir plataforma
        </button>
      </div>

      {/* Korean Crush Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">
          Crush Coreano
        </h3>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            value={formData.koreanCrush.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                koreanCrush: { ...formData.koreanCrush, name: e.target.value },
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Kim Soo-Hyun"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            URL de Imagen
          </label>
          <input
            type="url"
            value={formData.koreanCrush.image}
            onChange={(e) =>
              setFormData({
                ...formData,
                koreanCrush: { ...formData.koreanCrush, image: e.target.value },
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="https://example.com/actor-image.jpg"
          />
          {formData.koreanCrush.image && (
            <div className="mt-2 relative w-24 h-24">
              <Image
                src={formData.koreanCrush.image}
                alt="Actor preview"
                fill
                sizes="96px"
                style={{ objectFit: "cover" }}
                className="rounded-full shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Song Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">Canción</h3>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Título</label>
          <input
            type="text"
            value={formData.song.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                song: { ...formData.song, title: e.target.value },
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Beautiful"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Artista
          </label>
          <input
            type="text"
            value={formData.song.artist}
            onChange={(e) =>
              setFormData({
                ...formData,
                song: { ...formData.song, artist: e.target.value },
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Crush"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            URL de YouTube
          </label>
          <input
            type="url"
            value={formData.song.youtubeUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                song: { ...formData.song, youtubeUrl: e.target.value },
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      </div>

      {/* Favorite Quote Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">
          Frase Favorita
        </h3>
        <textarea
          value={formData.favoriteQuote}
          onChange={(e) =>
            setFormData({ ...formData, favoriteQuote: e.target.value })
          }
          className="w-full rounded-md border border-gray-300 p-2 h-20"
          placeholder="El éxito no se trata de dinero, sino de mantener tu integridad."
        ></textarea>
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors disabled:bg-gray-400 text-lg font-medium"
        >
          {loading
            ? isEditing
              ? "Actualizando..."
              : "Guardando..."
            : isEditing
            ? "Actualizar K-Drama"
            : "Crear K-Drama"}
        </button>
      </div>
    </form>
  );
}
