import React from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import UserAddNewAddress from "../../components/profile/UserAddNewAddress";

export default function newAddress() {
  return (
    <ProfileLayout>
      <UserAddNewAddress />
    </ProfileLayout>
  );
}
