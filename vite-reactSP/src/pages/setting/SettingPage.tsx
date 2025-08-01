import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SettingPopoverMenu from "../../components/setting/SettingPopoverMenu";
import AccountSettings from "../../components/setting/AccountSettings";
import PrivacySettings from "../../components/setting/PrivacySettings";

export default function SettingPage() {
  const [selected, setSelected] = useState("Account Settings");

  const { pstate } = useParams<{ pstate: string }>(); // mode from the URL path

  useEffect(() => {
    if (pstate === "account") {
      setSelected("Account Settings");
    } else if (pstate === "privacy") {
      setSelected("Privacy Settings");
    }
  }, [pstate]);

  const renderContent = () => {
    switch (selected) {
      case "Account Settings":
        return <AccountSettings />;
      case "Privacy Settings":
        return <PrivacySettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div
        className="position-sticky top-0 z-3 w-100"
        style={{
          backgroundColor: "#fafafa",
          paddingTop: "0.0rem",
          paddingBottom: "0.5rem",
        }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <SettingPopoverMenu selected={selected} onSelect={setSelected} />
        </div>
      </div>

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ maxWidth: "900px" }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
