import { Trash2, Upload } from "lucide-react";
import { useState } from "react";
import {
  useAdminVideos,
  useDeleteVideo,
  useUpdateVideo,
  useUploadVideo,
} from "../../hooks/useApi";

type Video = {
  _id: string;
  title: string;
  url: string;
  thumbnail?: string;
  size?: number;
  order: number;
  active: boolean;
  createdAt: string;
};

export default function AdminVideos() {
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data: videos = [], isLoading } = useAdminVideos();
  const uploadMutation = useUploadVideo();
  const deleteMutation = useDeleteVideo();
  const updateMutation = useUpdateVideo();

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !title.trim()) {
      alert("Please enter a title and select a video");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);

      await uploadMutation.mutateAsync(formData);
      setTitle("");
      (e.target as HTMLInputElement).value = "";
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  // Delete video
  const handleDelete = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await deleteMutation.mutateAsync(videoId);
      alert("Video deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete video");
    }
  };

  // Toggle active status
  const handleToggleActive = async (video: Video) => {
    try {
      await updateMutation.mutateAsync({
        id: video._id,
        data: {
          title: video.title,
          order: video.order,
          active: !video.active,
        },
      });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update video");
    }
  };

  // Format file size
  const formatSize = (bytes: number = 0) => {
    if (bytes === 0) return "Unknown";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Video Management
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Upload and manage videos for the homepage carousel. Videos are served
          through ImageKit.
        </p>
      </div>

      {/* Upload Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Upload New Video
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Luxury Pool Build"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Video File (MP4, WebM, MOV)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleUpload}
                disabled={uploading || uploadMutation.isPending}
                className="sr-only"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition"
              >
                <Upload className="h-5 w-5 text-slate-600" />
                <span className="text-sm text-slate-600">
                  {uploading || uploadMutation.isPending
                    ? "Uploading..."
                    : "Click to upload or drag and drop"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            All Videos ({videos.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-slate-500">
            Loading videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No videos uploaded yet
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {videos.map((video, index) => (
              <div
                key={video._id}
                className="flex items-center gap-4 p-4 hover:bg-slate-50 transition"
              >
                {/* Thumbnail */}
                {video.thumbnail && (
                  <div className="shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-16 w-20 rounded object-cover"
                    />
                  </div>
                )}

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {index + 1}. {video.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatSize(video.size)} •{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(video)}
                    disabled={updateMutation.isPending}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      video.active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    } disabled:opacity-50`}
                  >
                    {video.active ? "Active" : "Inactive"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(video._id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Delete video"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
