import React from 'react';
import styled from "styled-components";
import {IonIcon, IonInput} from "@ionic/react";
import {searchOutline} from "ionicons/icons";

const SearchWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 320px;
  width: 100%;
  padding: 0 15px;
  text-align: center;
  z-index: 99;
`

interface SearchProps {
  plate?: boolean,
  platePrefix?: boolean
}

export const SearchInput = styled(IonInput)`
  width: 100%;
  text-align: left;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.16);
  ${(props: SearchProps) => props.plate && `
    flex: 2;
    margin-left: 10px;
  `}
  ${(props: SearchProps) => props.platePrefix && `
    flex: 1;
  `}
`

const Search: React.FC<any> = ({OnFocus, OnChange}) => {
  return (
    <SearchWrapper>
      <SearchInput placeholder="ค้นหาจากป้ายทะเบียน" onFocus={OnFocus} onIonChange={OnChange}>
        <IonIcon style={{padding: '0 15px 0 20px'}} icon={searchOutline}/>
      </SearchInput>
    </SearchWrapper>
  );
};

export default Search;
