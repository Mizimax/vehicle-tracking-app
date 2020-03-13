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

const SearchInput = styled(IonInput)`
  width: 100%;
  text-align: left;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.16);
`

const Search: React.FC = () => {
  return (
    <SearchWrapper>
      <SearchInput placeholder="Type vehicle details">
        <IonIcon style={{padding: '0 15px 0 20px'}} icon={searchOutline}/>
      </SearchInput>
    </SearchWrapper>
  );
};

export default Search;
