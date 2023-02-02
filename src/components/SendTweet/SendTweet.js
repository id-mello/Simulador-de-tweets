import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import ModalContainer from "../ModalContainer";
import FormSendTweet from "../FormSendTweet";
import { TWEETS_STORAGE } from "../../utils/constants";

import "./sendTweet.scss";

export default function SendTweet(props) {
  const { setToastProps, allTweets } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const sendTweet = (event, formValue) => {
    event.preventDefault();
    // console.log("Tweet enviado...");
    // console.log(formValue);
    const { name, tweet } = formValue;
    let allTweetArray = [];

    if (allTweets) {
      allTweetArray = allTweets;
    }

    if (!name || !tweet) {
      setToastProps({
        open: true,
        text: "WARNING: Todos los campos son obligatorios.",
      });
      //console.log('WARNING: Todos los campos son obligatorios.')
    } else {
      formValue.time = moment();
      allTweetArray.push(formValue);
      localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetArray));
      setToastProps({
        open: true,
        text: "Tweet enviado correctamente.",
      });
      //console.log("Tweet enviado correctamente.");
      closeModal();
    }
    allTweetArray = [];
  };

  return (
    <div className="send-tweet">
      <Fab
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
      <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
        <FormSendTweet sendTweet={sendTweet} />
      </ModalContainer>
    </div>
  );
}
