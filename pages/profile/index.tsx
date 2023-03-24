import React from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import UserProfile from "../../components/profile/UserProfile";

export default function Profile() {
  return (
    <ProfileLayout>
      <UserProfile />
    </ProfileLayout>
  );
}
