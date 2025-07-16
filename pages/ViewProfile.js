import React, { useState, useEffect } from "react";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // LocalStorage load on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("scchs_User");
    if (storedUser) {
      try {
        setForm(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
      }
    } else {
      fetchUserProfile(); // fallback if no localStorage
    }
    setLoading(false);
  }, []);

  // GET API
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("scchs_Access");
      const response = await fetch("https://uat.scchs.co.in/api/user-profile", {
        method: "GET",
        headers: {
          headers: { "Content-Type": "application/json" },
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`,
        },
      });

      const data = await response.json();
      if (data.status) {
        setForm({ ...data.data });
        localStorage.setItem("scchs_User", JSON.stringify(data.data));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // POST API
  const updateProfileApi = async () => {
    if (form.mobile_number && !/^\d{10}$/.test(form.mobile_number)) {
      alert("Mobile Number must be exactly 10 digits.");
      return false;
    }
    // Email validation
    if (form.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // const payload = {
    //   prefix: clean(form.prefix),
    //   preferred_name: clean(form.preferred_name),
    //   middle: clean(form.middle),
    //   maiden_name: clean(form.maiden_name),
    //   use_maiden: clean(form.use_maiden),
    //   suffix: clean(form.suffix),
    //   dob: clean(form.dob),
    //   address2: clean(form.address2),
    //   postal_code: clean(form.postal_code),
    //   cell_phone: clean(form.cell_phone),
    //   int_phone: clean(form.int_phone),
    //   preferred: clean(form.preferred),
    //   website: clean(form.website),
    //   first_name: clean(form.first_name),
    //   last_name: clean(form.last_name), // ✅ proper required field
    //   company: clean(form.company),
    //   email: clean(form.email),
    //   username: clean(form.username),
    //   mobile_number: clean(form.mobile_number),
    //   avatar: clean(form.avatar) || "",
    //   address: clean(form.address),
    //   state: clean(form.state),
    //   city: clean(form.city),
    //   country: clean(form.country),
    //   dobMonth: clean(form.dobMonth),
    //   dobYear: clean(form.dobYear),
    // };
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val ?? "");
    });
    console.log("form.last_name:", form.last_name);


    try {
      const token = localStorage.getItem("scchs_Access");
      const res = await fetch("https://uat.scchs.co.in/api/profile-update", {
        method: "POST",
        headers: {
          headers: { "Content-Type": "application/json" },
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.status) {
        await fetchUserProfile(); // get fresh data
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        console.error("Update failed", result);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = async () => {
    if (isEdit) {
      await updateProfileApi();
    }
    setIsEdit(!isEdit);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1 className="">User Profile</h1>
      <div className="profile-grid">
        {[
          ["Prefix", "prefix"],
          ["First Name", "first_name"],
          ["Middle Name", "middle"],
          ["Last Name", "last_name"],
          ["Preferred Name", "preferred_name"],
          ["Maiden Name", "maiden_name"],
          ["Use Maiden", "use_maiden"],
          ["Suffix", "suffix"],
          ["Date of Birth", "dob"],
          ["DOB Month", "dobMonth"],
          ["DOB Year", "dobYear"],
          ["Address", "address"],
          ["Address 2", "address2"],
          ["Postal Code", "postal_code"],
          ["Cell Phone", "cell_phone"],
          ["Mobile Number", "mobile_number"],
          ["Email", "email"],
          ["Username", "username"],
          ["Company", "company"],
          ["Website", "website"],
          ["City", "city"],
          ["State", "state"],
          ["Country", "country"],
        ].map(([label, key]) => (
          <div key={key} className="profile-field">
            <label className="font-medium">{label}</label>
            {isEdit ? (
              <input
                type="text"
                name={key}
                value={form?.[key] || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              <p className="readonly">{form?.[key] || "-"}</p>
            )}
          </div>
        ))}
      </div>

      <div className="button-row">
        <button
          onClick={toggleEdit}

        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>

      {showPopup && (
        <div className="mt-4 text-green-600 font-medium">Profile updated!</div>
      )}
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  try {
    const globalSettings = await GlobalHeaderFooter();
    return {
      props: {
        page_content: false,
        navbar: globalSettings?.header,
        footer: globalSettings?.footer,
      },
    };
  } catch (error) {
    return {
      props: {
        page_content: false,
        navbar: false,
        footer: false,
      },
      notFound: true,
    };
  }
}