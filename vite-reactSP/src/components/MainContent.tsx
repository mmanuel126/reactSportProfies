type Props = {
  activePage: string;
};

export default function MainContent({ activePage }: Props) {
  switch (activePage) {
    case "home":
      return <h2>🏠 Home</h2>;
    case "search":
      return <h2>🔍 Search Page</h2>;
    case "profile":
      return <h2>👤 View Profile</h2>;
    case "edit-profile":
      return <h2>✏️ Edit Profile</h2>;
    default:
      return <h2>Welcome!</h2>;
  }
}
