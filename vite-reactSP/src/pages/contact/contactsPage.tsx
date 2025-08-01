import ContactPopoverMenu from "../../components/contact/ContactPopoverMenu";
import MyContacts from "../../components/contact/MyContacts";
import Requests from "../../components/contact/Requests";
import FindContacts from "../../components/contact/FindContacts";

import Following from "../../components/Following";
import PeopleFollowingMe from "../../components/contact/PeopleFollowingMe";
import { useState } from "react";
import SuggestedForYou from "../../components/contact/SuggestedForYou";

export default function ContactsPage() {

  const [selected, setSelected] = useState("My Contacts");

  const renderContent = () => {
    switch (selected) {
      case "My Contacts": return <MyContacts />;
      case "Requests": return <Requests />;
      case "Find Contacts":return <FindContacts />;
      case "Suggested For Me":return <SuggestedForYou />;
      case "People I Follow":return <Following />;
      case "People Following Me":return <PeopleFollowingMe />;
      default:
        return <MyContacts />;
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
          <ContactPopoverMenu selected={selected} onSelect={setSelected} />
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
