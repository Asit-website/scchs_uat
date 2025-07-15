import React, { useState, useEffect } from "react";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("scchs_User");
    if (user) {
      try {
        setForm(JSON.parse(user));
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const updateProfileApi = async () => {
   
  //   console.log("Sending form data:", form);
  //   try {
  //     const token = localStorage.getItem("scchs_Access");
  //     // alert(token);
  //     const response = await fetch("http://uat.scchs.co.in/api/profile-update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(form),
  //       // mode: 'cors'
  //     });
  //     const data = await response.json();
  //     console.log("API Response:", data);
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // };


  const updateProfileApi = async () => {
    try {
      const token = localStorage.getItem("scchs_Access");
  
      const response = await fetch("http://uat.scchs.co.in/api/profile-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.status) {
        // Update localStorage
        localStorage.setItem("scchs_User", JSON.stringify(data.data));
      } else {
        console.error("Profile update failed:", data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // const toggleEdit = () => {
  //   if (isEdit) {

  //     localStorage.setItem("scchs_User", JSON.stringify(form));
  //     setShowPopup(true);
  //     router.refresh();
  //     setTimeout(() => setShowPopup(false), 3000);
  //   }
  //   setIsEdit(!isEdit);
  // };

  // const toggleEdit = async () => {
  //   if (isEdit) {
  //     localStorage.setItem("scchs_User", JSON.stringify(form));


  //     await updateProfileApi();

  //     setShowPopup(true);
  //     setTimeout(() => setShowPopup(false), 3000);
  //   }
  //   setIsEdit(!isEdit);
  // };

  const toggleEdit = async () => {
    if (isEdit) {
      await updateProfileApi();
      localStorage.setItem("scchs_User", JSON.stringify(form));

      window.dispatchEvent(new Event("userProfileUpdated"));

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
    setIsEdit(!isEdit);
  };



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("scchs_User"))
    if (user) {
      try {
        setForm(user);
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
    setLoading(false);
  }, [isEdit])

  if (loading) return <p>Loading...</p>;

  return (
    <div className="viewprofile1-container">
      <h2 className="viewprofile1-title">User Profile</h2>

      {showPopup && (
        <div className="popup-toast">✅ Your profile is updated</div>
      )}

      <div className="viewprofile1-grid">
        {[
          ["Prefix", "prefix"],
          ["First Name", "first_name"],
          ["Last Name", "last_name"],
          ["Middle Name", "middle"],
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
          ["Website", "website"],
          ["City", "city"],
          ["State", "state"],
          ["Country", "country"],
          ["Status", "status"],
          ["User Type", "user_type"],
        ].map(([label, key]) => (
          <div key={key} className="viewprofile1-field-group">
            <label className="viewprofile1-label">{label}</label>
            {isEdit ? (
              <input
                type="text"
                name={key}
                value={form?.[key] || ""}
                onChange={handleChange}
                className="viewprofile1-input"
              />
            ) : (
              <p className="viewprofile1-text">{form?.[key] || "-"}</p>
            )}
          </div>
        ))}
      </div>

      <div className="viewprofile1-button-wrapper">
        <button onClick={toggleEdit} className="viewprofile1-button">
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
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
