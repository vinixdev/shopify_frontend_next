import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import {
  addQueryParams,
  removeQueryParams,
} from "../../../services/QueryService";
import {
  GroupAtteributes,
  ProductAttributeGroup,
} from "../interface/productInterfaces";
import FilterAttributeItem from "./FilterAttributeItem";

interface Props {
  group: GroupAtteributes;
  productsGroup: ProductAttributeGroup[];
  categoryName: string;
}

export default function FilterAttribute({
  group,
  productsGroup,
  categoryName,
}: Props) {
  const productsAttrs = productsGroup.map((g) => g.attributes).flat();
  const attrSet = new Set(productsAttrs.map((a) => a._id));
  const attrGroupValues: { [key: string]: Set<string> } = Object.assign(
    {},
    ...Array.from(attrSet).map((e) => ({ [e]: new Set() }))
  );

  productsAttrs.forEach((el) => {
    attrGroupValues[el._id].add(el.value);
  });

  // console.log(attrGroupAndValues);

  return (
    <li className="w-full">
      <ul className="w-full">
        {group.attributes
          .filter((attr) => attr.filterable)
          .map((attr) => {
            return (
              <FilterAttributeItem
                attribute={attr}
                categoryName={categoryName}
                attributeValues={attrGroupValues}
                key={attr._id}
              />
            );
          })}
      </ul>
    </li>
  );
}
