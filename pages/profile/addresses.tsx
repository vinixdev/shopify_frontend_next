import React from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import UserAddresses from "../../components/profile/UserAddresses";

export default function addresses() {
  return (
    <ProfileLayout>
      <UserAddresses />
    </ProfileLayout>
  );
}
