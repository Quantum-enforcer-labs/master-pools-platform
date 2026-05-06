import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  DollarSign,
  Eye,
  MessageCircle,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useAdminQuotations,
  useAdminUpdateQuotation,
} from "../../hooks/useApi";
import type { Quotation } from "../../types";

const STATUS_OPTIONS = [
  "pending",
  "reviewing",
  "quoted",
  "accepted",
  "rejected",
  "expired",
];
const STATUS_BADGE: Record<string, string> = {
  pending: "badge badge-gray",
  reviewing: "badge badge-blue",
  quoted: "badge badge-amber",
  accepted: "badge badge-green",
  rejected: "badge badge-red",
  expired: "badge badge-gray",
};

export default function AdminQuotations() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Quotation | null>(null);

  const { data, refetch } = useAdminQuotations({
    page,
    limit: 20,
    ...(statusFilter && { status: statusFilter }),
    ...(search && { search }),
  });
  const updateQ = useAdminUpdateQuotation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "reviewing",
      quotedAmount: "",
      adminNotes: "",
      validUntil: "",
      breakdown: [{ item: "", cost: "", description: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "breakdown",
  });

  const openModal = (q: Quotation) => {
    setSelected(q);
    reset({
      status: q.status,
      quotedAmount: q.quotedAmount?.amount?.toString() || "",
      adminNotes: q.adminNotes || "",
      validUntil: q.validUntil
        ? format(new Date(q.validUntil), "yyyy-MM-dd")
        : "",
      breakdown: q.quotedAmount?.breakdown?.length
        ? q.quotedAmount.breakdown.map((b) => ({
            item: b.item,
            cost: b.cost.toString(),
            description: b.description || "",
          }))
        : [{ item: "", cost: "", description: "" }],
    });
  };

  const onSubmit = (data: any) => {
    if (!selected) return;
    const payload: any = {
      status: data.status,
      adminNotes: data.adminNotes,
      validUntil: data.validUntil,
    };
    if (data.quotedAmount) {
      payload.quotedAmount = {
        amount: Number(data.quotedAmount),
        currency: "USD",
        breakdown: data.breakdown
          .filter((b: any) => b.item && b.cost)
          .map((b: any) => ({
            item: b.item,
            cost: Number(b.cost),
            description: b.description,
          })),
      };
    }
    updateQ.mutate(
      { id: selected._id, data: payload },
      {
        onSuccess: () => {
          toast.success("Quotation updated");
          setSelected(null);
          refetch();
        },
        onError: () => toast.error("Update failed"),
      },
    );
  };

  const totalValue =
    data?.quotations
      ?.filter(
        (q) =>
          q.quotedAmount?.amount && ["quoted", "accepted"].includes(q.status),
      )
      .reduce((s, q) => s + (q.quotedAmount?.amount || 0), 0) || 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Quotations
          </h1>
          <p
            style={{
              color: "var(--color-text-tertiary)",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              fontWeight: 500,
            }}
          >
            {data?.pagination?.total ?? 0} total requests · Pipeline:{" "}
            <span
              style={{ color: "var(--color-primary-900)", fontWeight: 700 }}
            >
              ${totalValue.toLocaleString()} USD
            </span>
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "0.875rem",
                height: "0.875rem",
                color: "var(--color-gray-400)",
              }}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search reference or client…"
              className="input"
              style={{ width: "14rem", paddingLeft: "2.25rem" }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="select"
            style={{ width: "auto", minWidth: "140px" }}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {["", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatusFilter(s);
              setPage(1);
            }}
            style={{
              padding: "0.4375rem 1rem",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: "1px solid",
              textTransform: "capitalize",
              background:
                statusFilter === s ? "var(--color-primary-900)" : "#fff",
              borderColor:
                statusFilter === s
                  ? "var(--color-primary-900)"
                  : "var(--color-border)",
              color: statusFilter === s ? "#fff" : "var(--color-gray-600)",
              boxShadow:
                statusFilter === s ? "0 2px 8px rgba(30,58,138,0.2)" : "none",
            }}
          >
            {s || "All Requests"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead
              style={{
                background: "var(--color-gray-50)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <tr>
                {[
                  "Ref #",
                  "Client",
                  "Pool Details",
                  "Status",
                  "Quoted Price",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="table-head">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!data?.quotations?.length ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "5rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    No quotation requests yet.
                  </td>
                </tr>
              ) : (
                data.quotations.map((q, i) => (
                  <motion.tr
                    key={q._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="table-row"
                  >
                    <td className="table-cell">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "var(--color-text-tertiary)",
                          background: "var(--color-gray-100)",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          fontWeight: 600,
                        }}
                      >
                        #{q.referenceNumber}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "7px",
                            background: "var(--color-primary-900)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "0.75rem",
                            flexShrink: 0,
                          }}
                        >
                          {(q.user as any)?.name?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "var(--color-text)",
                              fontSize: "0.875rem",
                              margin: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {(q.user as any)?.name}
                          </p>
                          <p
                            style={{
                              color: "var(--color-text-tertiary)",
                              fontSize: "0.75rem",
                              margin: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {(q.user as any)?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <p
                        style={{
                          color: "var(--color-text)",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          margin: 0,
                          textTransform: "capitalize",
                        }}
                      >
                        {q.poolType} Pool
                      </p>
                      <p
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontSize: "0.75rem",
                          margin: 0,
                          textTransform: "capitalize",
                        }}
                      >
                        {q.poolShape} shape · {q.features?.length || 0} features
                      </p>
                    </td>
                    <td className="table-cell">
                      <span className={STATUS_BADGE[q.status] || "badge-gray"}>
                        {q.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      {q.quotedAmount?.amount ? (
                        <span
                          style={{
                            color: "var(--color-primary-900)",
                            fontWeight: 800,
                            fontSize: "0.9375rem",
                          }}
                        >
                          ${q.quotedAmount.amount.toLocaleString()}
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "var(--color-gray-300)",
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                          }}
                        >
                          Not quoted
                        </span>
                      )}
                    </td>
                    <td
                      className="table-cell"
                      style={{
                        color: "var(--color-text-tertiary)",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                      }}
                    >
                      {format(new Date(q.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="table-cell">
                      <div style={{ display: "flex", gap: "0.375rem" }}>
                        <button
                          onClick={() => openModal(q)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.4375rem 0.75rem" }}
                        >
                          <Eye
                            style={{ width: "0.875rem", height: "0.875rem" }}
                          />{" "}
                          Manage
                        </button>
                        {q.conversationId && (
                          <Link
                            to="/admin/chat"
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: "0.4375rem",
                              textDecoration: "none",
                            }}
                          >
                            <MessageCircle
                              style={{ width: "0.875rem", height: "0.875rem" }}
                            />
                          </Link>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "2.5rem 1.5rem",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              className="card"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "42rem",
                zIndex: 10,
                padding: "2rem",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Manage Quotation
                  </h2>
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      margin: "0.25rem 0 0",
                    }}
                  >
                    REF: #{selected.referenceNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--color-gray-400)",
                  }}
                >
                  <X style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              </div>

              <div
                style={{
                  background: "var(--color-gray-50)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    color: "var(--color-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1rem",
                  }}
                >
                  Original Request
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "1rem",
                  }}
                >
                  {[
                    ["Client", (selected.user as any)?.name],
                    ["Email", (selected.user as any)?.email],
                    ["Pool Type", selected.poolType],
                    ["Shape", selected.poolShape],
                    ["Location", selected.location?.city || "—"],
                    [
                      "Budget",
                      selected.budget?.min
                        ? `$${selected.budget.min.toLocaleString()} – $${selected.budget.max?.toLocaleString() || "?"}`
                        : "—",
                    ],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p
                        style={{
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          color: "var(--color-text-tertiary)",
                          textTransform: "uppercase",
                          margin: "0 0 0.125rem",
                        }}
                      >
                        {l}
                      </p>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text)",
                          margin: 0,
                          fontWeight: 600,
                          textTransform: l.includes("Pool")
                            ? "capitalize"
                            : "none",
                        }}
                      >
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <label className="label">Quotation Status</label>
                    <select {...register("status")} className="select">
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Validity (Valid Until)</label>
                    <input
                      type="date"
                      {...register("validUntil")}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Final Quoted Price (USD)</label>
                  <div style={{ position: "relative" }}>
                    <DollarSign
                      style={{
                        position: "absolute",
                        left: "0.875rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "1.125rem",
                        height: "1.125rem",
                        color: "var(--color-gray-400)",
                      }}
                    />
                    <input
                      type="number"
                      {...register("quotedAmount")}
                      className="input"
                      placeholder="e.g. 15000"
                      style={{
                        paddingLeft: "2.5rem",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <label className="label" style={{ margin: 0 }}>
                      Itemized Breakdown
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        append({ item: "", cost: "", description: "" })
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.75rem",
                        color: "var(--color-primary-700)",
                        background: "var(--color-primary-50)",
                        border: "1px solid var(--color-primary-100)",
                        borderRadius: "6px",
                        padding: "0.25rem 0.625rem",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      <Plus style={{ width: "0.875rem", height: "0.875rem" }} />{" "}
                      Add Line Item
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {fields.map((field, i) => (
                      <div
                        key={field.id}
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <input
                          {...register(`breakdown.${i}.item`)}
                          className="input"
                          placeholder="Service or Item"
                          style={{ flex: 3 }}
                        />
                        <input
                          type="number"
                          {...register(`breakdown.${i}.cost`)}
                          className="input"
                          placeholder="Cost $"
                          style={{ flex: 1.5, fontWeight: 600 }}
                        />
                        <button
                          type="button"
                          onClick={() => remove(i)}
                          style={{
                            padding: "0.5rem",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--color-gray-300)",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color =
                              "var(--color-danger)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                              "var(--color-gray-300)")
                          }
                        >
                          <Trash2 style={{ width: "1rem", height: "1rem" }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Notes to Client</label>
                  <textarea
                    {...register("adminNotes")}
                    rows={3}
                    className="textarea"
                    placeholder="Include any specific terms, assumptions or next steps for the client..."
                  />
                </div>

                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="btn btn-secondary btn-lg"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateQ.isPending}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 2 }}
                  >
                    {updateQ.isPending
                      ? "Updating..."
                      : "Save and Send Quotation"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
