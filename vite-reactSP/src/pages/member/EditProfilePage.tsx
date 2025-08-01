import React from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import EditMember from '../../components/member/edit-profile/EditMember';
import { useParams } from 'react-router-dom';

const EditProfilePage: React.FC = () => {
  const id = useSelector((state: RootState) => state.auth.user?.memberID);

  const { mode } = useParams<{ mode: string }>();  // mode from the URL path

  if (!id) return <div>No member ID provided.</div>;

  return <EditMember memberId={id} mode={mode || ""} />;
};

export default EditProfilePage;
