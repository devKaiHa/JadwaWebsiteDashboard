import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { toast, ToastContainer } from "react-toastify";
import LoadingCard from "../../components/Global/LoadingCard";
import ErrorMessageCard from "../../components/Global/ErrorMessageCard";
import { useSettings, useUpdateSettings } from "./useSettings";

const emptyML = () => ({ ar: "", en: "" });

const Settings = () => {
  const { settings, isLoading, error } = useSettings();
  const { handleUpdateSettings, isLoading: isSaving } = useUpdateSettings();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    workingHours: emptyML(),
    socialMedia: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      telegram: "",
      whatsapp: "",
    },
    investNowUrl: "",
    footerAbout: emptyML(),
    quickLinks: [],
    fundLinks: [],
    addresses: [],
    newsletterEnabled: true,
    privacyUrl: "",
    termsUrl: "",
  });

  // initialize form from API
  useEffect(() => {
    if (!settings) return;

    setForm({
      email: settings.email || "",
      phone: settings.phone || "",
      workingHours: settings.workingHours || emptyML(),
      socialMedia: {
        facebook: settings.socialMedia?.facebook || "",
        linkedin: settings.socialMedia?.linkedin || "",
        twitter: settings.socialMedia?.twitter || "",
        instagram: settings.socialMedia?.instagram || "",
        youtube: settings.socialMedia?.youtube || "",
        telegram: settings.socialMedia?.telegram || "",
        whatsapp: settings.socialMedia?.whatsapp || "",
      },
      investNowUrl: settings.investNowUrl || "",
      footerAbout: settings.footerAbout || emptyML(),
      quickLinks: Array.isArray(settings.quickLinks) ? settings.quickLinks : [],
      fundLinks: Array.isArray(settings.fundLinks) ? settings.fundLinks : [],
      addresses: Array.isArray(settings.addresses) ? settings.addresses : [],
      newsletterEnabled:
        typeof settings.newsletterEnabled === "boolean"
          ? settings.newsletterEnabled
          : true,
      privacyUrl: settings.privacyUrl || "",
      termsUrl: settings.termsUrl || "",
    });
  }, [settings]);

  // helpers
  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const setML = (key, lang, value) =>
    setForm((p) => ({ ...p, [key]: { ...p[key], [lang]: value } }));

  const setSocial = (key, value) =>
    setForm((p) => ({
      ...p,
      socialMedia: { ...p.socialMedia, [key]: value },
    }));

  const updateArrayItem = (arrKey, index, patch) => {
    setForm((p) => {
      const next = [...(p[arrKey] || [])];
      next[index] = { ...(next[index] || {}), ...patch };
      return { ...p, [arrKey]: next };
    });
  };

  const removeArrayItem = (arrKey, index) => {
    setForm((p) => {
      const next = [...(p[arrKey] || [])];
      next.splice(index, 1);
      return { ...p, [arrKey]: next };
    });
  };

  const addQuickLink = () => {
    setForm((p) => ({
      ...p,
      quickLinks: [
        ...(p.quickLinks || []),
        { label: emptyML(), url: "", order: 0, isActive: true },
      ],
    }));
  };

  const addFundLink = () => {
    setForm((p) => ({
      ...p,
      fundLinks: [
        ...(p.fundLinks || []),
        { fund: "", order: 0, isActive: true },
      ],
    }));
  };

  const addAddress = () => {
    setForm((p) => ({
      ...p,
      addresses: [
        ...(p.addresses || []),
        {
          city: "",
          address: emptyML(),
          mapUrl: "",
          phone: "",
          order: 0,
          isActive: true,
        },
      ],
    }));
  };

  const normalizeML = (ml, fieldName) => {
    const ar = (ml?.ar || "").trim();
    const en = (ml?.en || "").trim();

    // if both empty make it undefined so backend won't validate it
    if (!ar && !en) return undefined;

    // if one missing block submit (backend requires both)
    if (!ar || !en) {
      throw new Error(`${fieldName}: both AR and EN are required`);
    }
    return { ar, en };
  };

  const buildPayload = () => {
    const payload = {
      email: (form.email || "").trim(),
      phone: (form.phone || "").trim(),
      investNowUrl: (form.investNowUrl || "").trim(),
      newsletterEnabled: !!form.newsletterEnabled,
      privacyUrl: (form.privacyUrl || "").trim(),
      termsUrl: (form.termsUrl || "").trim(),
      socialMedia: {
        facebook: (form.socialMedia.facebook || "").trim(),
        linkedin: (form.socialMedia.linkedin || "").trim(),
        twitter: (form.socialMedia.twitter || "").trim(),
        instagram: (form.socialMedia.instagram || "").trim(),
        youtube: (form.socialMedia.youtube || "").trim(),
        telegram: (form.socialMedia.telegram || "").trim(),
        whatsapp: (form.socialMedia.whatsapp || "").trim(),
      },
    };

    const workingHours = normalizeML(form.workingHours, "Working hours");
    const footerAbout = normalizeML(form.footerAbout, "Footer about");

    if (workingHours) payload.workingHours = workingHours;
    if (footerAbout) payload.footerAbout = footerAbout;

    // quickLinks (if present, each label needs ar+en, url required)
    if (Array.isArray(form.quickLinks)) {
      payload.quickLinks = form.quickLinks.map((x, i) => {
        const label = normalizeML(x.label, `Quick link #${i + 1} label`);
        if (!label) throw new Error(`Quick link #${i + 1}: label is required`);

        const url = (x.url || "").trim();
        if (!url) throw new Error(`Quick link #${i + 1}: url is required`);

        return {
          label,
          url,
          order: Number(x.order) || 0,
          isActive: x.isActive !== false,
        };
      });
    }

    // fundLinks (fund required if item exists)
    if (Array.isArray(form.fundLinks)) {
      payload.fundLinks = form.fundLinks.map((x, i) => {
        const fund = (x.fund || "").trim();
        if (!fund) throw new Error(`Fund link #${i + 1}: fund is required`);

        return {
          fund,
          order: Number(x.order) || 0,
          isActive: x.isActive !== false,
        };
      });
    }

    // addresses
    if (Array.isArray(form.addresses)) {
      payload.addresses = form.addresses.map((x, i) => {
        const city = (x.city || "").trim();
        if (!city) throw new Error(`Address #${i + 1}: city is required`);

        const address = normalizeML(x.address, `Address #${i + 1} address`);
        if (!address) throw new Error(`Address #${i + 1}: address is required`);

        return {
          city,
          address,
          mapUrl: (x.mapUrl || "").trim(),
          phone: (x.phone || "").trim(),
          order: Number(x.order) || 0,
          isActive: x.isActive !== false,
        };
      });
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = buildPayload();
      await handleUpdateSettings(payload);
      toast.success("Settings updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to update settings");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Site Settings</h3>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSaving}
              type="button"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card-body grid gap-8">
              {/* Basic */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="input w-full"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="info@example.com"
                  />
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input
                    className="input w-full"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+90 555 555 55 55"
                  />
                </div>
              </div>

              {/* Working hours */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Working Hours (EN)</label>
                  <input
                    className="input w-full"
                    value={form.workingHours?.en || ""}
                    onChange={(e) =>
                      setML("workingHours", "en", e.target.value)
                    }
                    placeholder="Sunday to Thursday 9-5"
                  />
                </div>
                <div>
                  <label className="form-label">Working Hours (AR)</label>
                  <input
                    className="input w-full"
                    value={form.workingHours?.ar || ""}
                    onChange={(e) =>
                      setML("workingHours", "ar", e.target.value)
                    }
                    placeholder="من الأحد إلى الخميس 9-5"
                  />
                </div>
              </div>

              {/* Social media */}
              <div className="card p-4 border rounded-lg">
                <div className="font-semibold mb-3">Social Media</div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "facebook",
                    "linkedin",
                    "twitter",
                    "instagram",
                    "youtube",
                    "telegram",
                    "whatsapp",
                  ].map((k) => (
                    <div key={k}>
                      <label className="form-label capitalize">{k}</label>
                      <input
                        className="input w-full"
                        value={form.socialMedia?.[k] || ""}
                        onChange={(e) => setSocial(k, e.target.value)}
                        placeholder={`https://${k}.com/...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Invest now URL */}
              <div>
                <label className="form-label">Invest Now URL</label>
                <input
                  className="input w-full"
                  value={form.investNowUrl}
                  onChange={(e) => setField("investNowUrl", e.target.value)}
                  placeholder="https://invest.example.com"
                />
              </div>

              {/* Footer about */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Footer About (EN)</label>
                  <textarea
                    className="textarea w-full"
                    rows={4}
                    value={form.footerAbout?.en || ""}
                    onChange={(e) => setML("footerAbout", "en", e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Footer About (AR)</label>
                  <textarea
                    className="textarea w-full"
                    rows={4}
                    value={form.footerAbout?.ar || ""}
                    onChange={(e) => setML("footerAbout", "ar", e.target.value)}
                  />
                </div>
              </div>

              {/* Quick links */}
              <div className="card p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">Quick Links</div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={addQuickLink}
                  >
                    + Add Link
                  </button>
                </div>

                <div className="grid gap-4">
                  {form.quickLinks?.map((x, idx) => (
                    <div key={idx} className="border rounded-lg p-3 grid gap-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="form-label">Label (EN)</label>
                          <input
                            className="input w-full"
                            value={x.label?.en || ""}
                            onChange={(e) =>
                              updateArrayItem("quickLinks", idx, {
                                label: {
                                  ...(x.label || {}),
                                  en: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="form-label">Label (AR)</label>
                          <input
                            className="input w-full"
                            value={x.label?.ar || ""}
                            onChange={(e) =>
                              updateArrayItem("quickLinks", idx, {
                                label: {
                                  ...(x.label || {}),
                                  ar: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="form-label">URL</label>
                          <input
                            className="input w-full"
                            value={x.url || ""}
                            onChange={(e) =>
                              updateArrayItem("quickLinks", idx, {
                                url: e.target.value,
                              })
                            }
                            placeholder="/about"
                          />
                        </div>

                        <div>
                          <label className="form-label">Order</label>
                          <input
                            type="number"
                            className="input w-full"
                            value={x.order ?? 0}
                            onChange={(e) =>
                              updateArrayItem("quickLinks", idx, {
                                order: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={x.isActive !== false}
                            onChange={(e) =>
                              updateArrayItem("quickLinks", idx, {
                                isActive: e.target.checked,
                              })
                            }
                          />
                          Active
                        </label>

                        <button
                          type="button"
                          className="btn btn-light text-danger"
                          onClick={() => removeArrayItem("quickLinks", idx)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {!form.quickLinks?.length && (
                    <div className="text-sm text-gray-500">No quick links</div>
                  )}
                </div>
              </div>

              {/* Fund links */}
              <div className="card p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">Fund Links</div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={addFundLink}
                  >
                    + Add Fund
                  </button>
                </div>

                <div className="grid gap-4">
                  {form.fundLinks?.map((x, idx) => (
                    <div key={idx} className="border rounded-lg p-3 grid gap-3">
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="form-label">Fund Id</label>
                          <input
                            className="input w-full"
                            value={x.fund || ""}
                            onChange={(e) =>
                              updateArrayItem("fundLinks", idx, {
                                fund: e.target.value,
                              })
                            }
                            placeholder="67ce1234abcd5678ef901234"
                          />
                          {/* If you have Funds list hook later, swap this input with SearchableSelect */}
                        </div>

                        <div>
                          <label className="form-label">Order</label>
                          <input
                            type="number"
                            className="input w-full"
                            value={x.order ?? 0}
                            onChange={(e) =>
                              updateArrayItem("fundLinks", idx, {
                                order: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={x.isActive !== false}
                            onChange={(e) =>
                              updateArrayItem("fundLinks", idx, {
                                isActive: e.target.checked,
                              })
                            }
                          />
                          Active
                        </label>

                        <button
                          type="button"
                          className="btn btn-light text-danger"
                          onClick={() => removeArrayItem("fundLinks", idx)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {!form.fundLinks?.length && (
                    <div className="text-sm text-gray-500">No fund links</div>
                  )}
                </div>
              </div>

              {/* Addresses */}
              <div className="card p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">Addresses</div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={addAddress}
                  >
                    + Add Address
                  </button>
                </div>

                <div className="grid gap-4">
                  {form.addresses?.map((x, idx) => (
                    <div key={idx} className="border rounded-lg p-3 grid gap-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="form-label">City</label>
                          <input
                            className="input w-full"
                            value={x.city || ""}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                city: e.target.value,
                              })
                            }
                            placeholder="Gaziantep"
                          />
                        </div>

                        <div>
                          <label className="form-label">Phone</label>
                          <input
                            className="input w-full"
                            value={x.phone || ""}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                phone: e.target.value,
                              })
                            }
                            placeholder="+90 555 555 55 55"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="form-label">Address (EN)</label>
                          <textarea
                            className="textarea w-full"
                            rows={3}
                            value={x.address?.en || ""}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                address: {
                                  ...(x.address || {}),
                                  en: e.target.value,
                                },
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="form-label">Address (AR)</label>
                          <textarea
                            className="textarea w-full"
                            rows={3}
                            value={x.address?.ar || ""}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                address: {
                                  ...(x.address || {}),
                                  ar: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="form-label">Map URL</label>
                          <input
                            className="input w-full"
                            value={x.mapUrl || ""}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                mapUrl: e.target.value,
                              })
                            }
                            placeholder="https://maps.google.com/..."
                          />
                        </div>

                        <div>
                          <label className="form-label">Order</label>
                          <input
                            type="number"
                            className="input w-full"
                            value={x.order ?? 0}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                order: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={x.isActive !== false}
                            onChange={(e) =>
                              updateArrayItem("addresses", idx, {
                                isActive: e.target.checked,
                              })
                            }
                          />
                          Active
                        </label>

                        <button
                          type="button"
                          className="btn btn-light text-danger"
                          onClick={() => removeArrayItem("addresses", idx)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {!form.addresses?.length && (
                    <div className="text-sm text-gray-500">No addresses</div>
                  )}
                </div>
              </div>

              {/* Legal */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Privacy URL</label>
                  <input
                    className="input w-full"
                    value={form.privacyUrl}
                    onChange={(e) => setField("privacyUrl", e.target.value)}
                    placeholder="/privacy"
                  />
                </div>
                <div>
                  <label className="form-label">Terms URL</label>
                  <input
                    className="input w-full"
                    value={form.termsUrl}
                    onChange={(e) => setField("termsUrl", e.target.value)}
                    placeholder="/terms"
                  />
                </div>
              </div>

              {/* Newsletter */}
              <div className="flex items-center gap-3">
                <label className="form-label m-0">Newsletter Enabled</label>
                <input
                  type="checkbox"
                  checked={!!form.newsletterEnabled}
                  onChange={(e) =>
                    setField("newsletterEnabled", e.target.checked)
                  }
                />
              </div>
            </div>

            <div className="card-footer flex justify-end gap-3">
              <button
                className="btn btn-primary"
                disabled={isSaving}
                type="submit"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default Settings;
