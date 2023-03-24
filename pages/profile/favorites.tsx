import React from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import UserFavorites from "../../components/profile/UserFavorites";

export default function favorites() {
  return (
    <ProfileLayout>
      <UserFavorites />
    </ProfileLayout>
  );
}
