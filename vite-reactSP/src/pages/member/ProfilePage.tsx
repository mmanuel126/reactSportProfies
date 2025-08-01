import React from 'react';
import { useParams } from 'react-router-dom';
import ViewMember from '../../components/member/ViewMember';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>No member ID provided.</div>;

  return <ViewMember memberId={id} />;
};

export default ProfilePage;
