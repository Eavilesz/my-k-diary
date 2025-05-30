"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KDramaPost, Status } from "@/lib/posts"; // Add Status import

interface KDramaFormProps {
  initialData?: KDramaPost;
  isEditing?: boolean;
  postId?: string;
}

// Define the available platforms with their data (remove baseUrl since we don't use URLs)
const AVAILABLE_PLATFORMS = {
  netflix: {
    platform: "Netflix",
    icon: "netflix",
  },
  primevideo: {
    platform: "Prime Video",
    icon: "primevideo",
  },
  viki: {
    platform: "Viki",
    icon: "viki",
  },
  youtube: {
    platform: "YouTube",
    icon: "youtube",
  },
  other: {
    platform: "Otro",
    icon: "other",
  },
};

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
    status: (initialData?.status || "Viendo") as Status, // Cast to Status type
    tags: initialData?.tags || ["Romántico"],
    favoriteQuote: initialData?.favoriteQuote || "",
    whereToWatch: initialData?.whereToWatch || [],
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

  // Add platform (simplified - no URL needed)
  const addPlatform = (platformKey: string) => {
    const platformData =
      AVAILABLE_PLATFORMS[platformKey as keyof typeof AVAILABLE_PLATFORMS];

    // Check if platform already exists
    const exists = formData.whereToWatch.some(
      (p) => p.icon === platformData.icon
    );
    if (exists) return;

    const newPlatform = {
      platform: platformData.platform,
      icon: platformData.icon,
    };

    setFormData({
      ...formData,
      whereToWatch: [...formData.whereToWatch, newPlatform],
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

        {/* Status selector - FIXED */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Estado</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as Status })
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

      {/* Where to Watch Section - SIMPLIFIED */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-pink-100/50">
        <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">Dónde Ver</h3>

        {/* Selected Platforms */}
        {formData.whereToWatch.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {formData.whereToWatch.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full border"
                >
                  <span className="font-medium">{platform.platform}</span>
                  <button
                    type="button"
                    onClick={() => removePlatform(index)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Platform Dropdown */}
        <div className="flex items-center gap-3">
          <select
            id="platformSelect"
            className="rounded-md border border-gray-300 p-2"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccionar plataforma
            </option>
            {Object.entries(AVAILABLE_PLATFORMS).map(([key, platform]) => {
              const isAlreadyAdded = formData.whereToWatch.some(
                (p) => p.icon === platform.icon
              );
              return (
                <option key={key} value={key} disabled={isAlreadyAdded}>
                  {platform.platform} {isAlreadyAdded ? "(ya agregado)" : ""}
                </option>
              );
            })}
          </select>

          <button
            type="button"
            onClick={() => {
              const select = document.getElementById(
                "platformSelect"
              ) as HTMLSelectElement;
              if (select.value) {
                addPlatform(select.value);
                select.value = ""; // Reset selection
              }
            }}
            className="px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors"
          >
            Añadir
          </button>
        </div>

        {formData.whereToWatch.length === 0 && (
          <p className="text-gray-500 italic text-sm mt-2">
            No se han agregado plataformas aún. Selecciona una plataforma
            arriba.
          </p>
        )}
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
