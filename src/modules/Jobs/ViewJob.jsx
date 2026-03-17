import { Tooltip } from "@mui/material";
import { SquareArrowOutUpRight } from "lucide-react";
import { PlatformUrl } from "../../Api/GlobalData";
import ExpandableText from "../../components/Global/ExpandableText";
import { htmlToPlainText } from "../../lib/helpers";

export const ViewJob = ({ job }) => {
  return (
    <div className="max-h-[75vh] overflow-y-auto pr-1">
      <div className="space-y-6">
        {/* Top summary */}
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {job?.title?.en || job?.title?.ar || "Untitled Job"}
                </h2>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    job?.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job?.isActive ? "Active" : "Inactive"}
                </span>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    job?.isPublished
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {job?.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <p className="text-sm text-gray-500 break-all">
                <span className="flex gap-2 items-center">
                  /{job?.slug || "no-slug"}
                  <Tooltip
                    disableInteractive
                    title="View in the website"
                    placement="top"
                  >
                    <SquareArrowOutUpRight
                      size={16}
                      className="text-primary cursor-pointer"
                      onClick={() => {
                        if (job?.slug) {
                          window.open(
                            `${PlatformUrl}job/${job?.slug}`,
                            "_blank",
                          );
                        }
                      }}
                    />
                  </Tooltip>
                </span>
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {job?.employmentType
                    ?.replaceAll("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A"}
                </span>

                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {job?.location || "No location"}
                </span>
              </div>
            </div>

            <div className="grid min-w-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Published At
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {job?.publishedAt
                    ? new Date(job.publishedAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Last Updated
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {job?.updatedAt
                    ? new Date(job.updatedAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main info grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* English */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                English Content
              </h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                EN
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Title
                </p>
                <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800">
                  {job?.title?.en || "-"}
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                  <span className="ms-2 text-2xs text-gray-400">
                    Preview only
                  </span>
                </p>
                <div className="min-h-[120px] rounded-xl bg-gray-50 px-4 py-3">
                  <ExpandableText
                    maxChars={150}
                    text={htmlToPlainText(job?.description?.en)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arabic */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Arabic Content
              </h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                AR
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Title
                </p>
                <div
                  dir="rtl"
                  className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800"
                >
                  {job?.title?.ar || "-"}
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                  <span className="ms-2 text-2xs text-gray-400">
                    Preview only
                  </span>
                </p>
                <div className="min-h-[120px] rounded-xl bg-gray-50 px-4 py-3">
                  <ExpandableText
                    maxChars={150}
                    text={htmlToPlainText(job?.description?.ar)}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Metadata</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Slug
              </p>
              <p className="mt-2 break-all text-sm font-medium text-gray-900">
                {job?.slug || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Employment Type
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {job?.employmentType
                  ?.replaceAll("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase()) || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Location
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {job?.location || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
