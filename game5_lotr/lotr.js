const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector("#resetButton");
const timerDisplay = document.querySelector("#timer");
const audio = document.querySelector("#audio");
const pause = document.querySelector("#pauseButton");
const play = document.querySelector("#playButton");
const congrats = document.querySelector("#congrats");
const congratsMsg = document.querySelector("#congratsMsg");
const congratsAudio = document.querySelector("#congratsAudio");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = true;
let startTime, elapsedTime, timerInterval;

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function flipCard({ target: clickedCard }) {
  if (!disableDeck && cardOne !== clickedCard) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      cardOne = clickedCard;
      startTimer();
      return;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      stopTimer();
      audio.pause();
      congratsAudio.play();
      congrats.style.display = "block";
      congratsMsg.innerHTML = `A játékot ${timerDisplay.textContent} másodperc alatt sikerült teljesítened!<br>Újraindításhoz nyomd meg a Reset gombot!`;
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  startTime = null;
  let links = [
//1
    "https://lh3.googleusercontent.com/pw/AP1GczMJJqqPDjcDy50MsyBA_UnISUo5nHx8AKAYYMGloFm7ROSsOksYTlanhqTXe7MOMcddrIwX6aIm5nf1ZeF7faISZAMAasJoxReTGD5JiAxxwb4A5GMXhR4UoYMctGYeMcgHb1f2lM63jL2iapMwphr3EgJrPwxgAOqS-Zt-8b6u1mYzD3sBksFFvGlX1ezwyzkO4VlOiqFMZS2Rurk0prdTm1au8PCNVbkxonhq06c73jla1vDjshwBnK0Obi2I2a91GUfZNFItJZyY_Oea1MquplHfhFdnvBfi-AWQ3hJHJf2bZXaYaq3fFW9o3aGPhmJenQARUAAhbK1OyPBo_2vJlS1geypBm6A5acgKecsuUF4qk88PULEe_XNNhA7EaP4kj8I1zIKfhxtldaFHbj86ZMhFsLPC5Q3lVvGgtYnBkMlxu5DHyZkUHy2jwbsio3ibG7jejS_ZU33BeyQVKl3hPGXUs2drlPRz9Tw35HoUvDErMgYf5NOU_n84_XQ7mr1pebU82rm4V7DSF_CVFoN2YEumTNuHckRh-PPEyYBuO3zwjBKxgPPvHFkNRp0oOtKafDjlA5kWuOOmLS1Tw4Vx-ba-2AYvnVdghPW3VR0S9ATchL1NiqUxOJGSAA4id0XQNQ4M7BEcwO28gJ4-4faLXi7t9MkDRT9DjnH2-p2FTANBKmiYh-Y5ibq2pj90Oj0o5tTo0f6oPTJ4eXSq9e2O7tB68EMuRz4rs3IkQrrOBBYBCnMlsvvVxKXa3eowDX6ip0QhOmFXfYLZdziHFdw49O0e6zI48aIdNmDnjnRIDk5F41PvWAzcm5LE4WO82_OkrNv9e2h2_KvXfCaHQsKJVak55mUM2q04lgbFgJwb9xb6b2Bw9aqPkF5zJxFliIlrSH8RalsCFrGVe6TRIaIffwpUYWDz4liJY6WH07OEjlCV78-dxGUreOwJ=w483-h517-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczOykB-FssTdJkOm5r9a6Q5ojDQj3j6t2jwbgDnxz05DHaoRrxxtfCcodEgPJC7PMnnLaTMDFrU6nkBkntKKEr5zgl29XS5tG1Qgd0gIu89hMDLiXiEuV7YTEjJkP2hnWV8s_zoschle9JD0sipNoTfjFZSaP1y5ZaezhkxDWi_lA9WAZWNJfqi0OhydpeiKGlOm6iEe5bI3r3B6_fKzyMZVUCVnsarGhZx3G1fYXYItM3tUz-BV5e15QJhaRTy64RuoKkX0Zeqoq4kyy5FvEkZdS3d3BATEOLuMCwa-GzgUCed_JaZA-MOndNo3g_lQph5Y86Ny82TCgnLLmRZ7PGS5GYyAfA8vLCu_KP4epaGRfiZuCDwaX-mL8pofLGkQ3SGDILCuhUTkZWsOB2ElEtIOFvt2ZA5K8Im-bqcgIFAQcrhdjkYYVgRGc7FeiL0jX5V1xy-npUhqAHkjUJDQNjp6Gj1sFZYZhPMpTHLRuNxxYp5RjDSVqlTYHksIS52gcQSYlrSjcLsMAt5p1uj9A7OhIs14HBYmYOw5mAdBWEnLTeQeJKdF9JsmcuQWaztaKhIWFscZUSNNqbsBfNV-w-D4Xk5cKkApDzM0bXriE8d5GW1BUedjMFvbT5ZndenZEv6F7FWxCaWvVIZqaFBaxxvEV7OSmeVuNAyNlztb9_BBl2T9NstXqy7aLIE7J4GpDQx_JPaLPOeifaKDIyF-G9qh8_2qD71146d4BOFMD5flvQ-2fRYK5GT4dDj5DbcSEtPbQkxh8-vth2_9HnfY15C4_PTLT3daCVpDYmCgG4iXCeD6A5Ji12egEfTNel-9Y0KdZ8qucHcPERHQR03IYeLTh8c4UKd-arQ775sY1zwGlWueL4ZkXtwkoTHOgdvD9Wl-1xRl6bi3jtNuo224uK_SVtapHEDBcvfR_tH0mCBFtve6-C1f552euzp1=w400-h400-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczO0Fm0lM2qPATNv_cU-Oat57I4U7g95c8EQIwCeOyP0C7Vu2D2ubtcYqojP9ORRPPaulSzDpTRzQM0ZX-qeh6m3-IxwTu63vfrrD230MjkEZLxlY8rtc9ujdcW5vcGt9DOQuDUK08SZ8ZlQx2T9ZSq-HuNxvz83XHkoP2iZqlW85p4r95DvDqhuqO-ia1V9PB7PyPPjqblXSwIo6rA-PDmlJa-bg9rXnmQh9Xt1bbOkpTxZKpaNfQwRYgK792fKnVqhMchrAeU8gHXdVrX5UpW2jHw6qdrP-xI1ASwMNUUfJK94b5LFSGk5jeWfyaOAiBbvpUVXMUD4PMGCvCqkQpQJHkRybDjnJHUR2PzZD0a-m2S9qK3dMZitj9a8AvBisQ9HpzVNDspHPWBAbJaHvDFVlOi2Kg83Ri-JW0ySy5g2O1odhiSM0gZ_RWFN1fIPQosxs1SalK8Df_YoggL1uR3jFs93C6pFhiKoTygUaNtIe-cYYtKJFHhFGkIbwTWhrcczjPmcv2S9JOGo6kNXRO1Xl9f2aG4yEixI9pGffOnuJZ2AzG4-CCg1aj6Zj67tev5YRp8japRqJ3XZdWaqVK368vjP_8Tqdqdfb1Wy8kJjq26a5h_ym6F12B_17y38nvm9VNfK3H1slwY8vc9hrYAq3toGS270FRpj-9gLmw1rwuUdwF87UAZfVaLs8-8XBF-GnmR-P1sUJ06yMCnPkee0znFBDyT7-x-KuCgQdfWGA3Cvri0mTw625zCf1BFmu3jKKE0hv_c9XnpQmWQQiMluLzkjVSGFSJrjHGhNLimB0lCyOjrm6fpQKnCtafeQQE-_9AIu2BSzPCqoMdfijoZsjJCSqYV1jBsZI4N6zaj2-4o01RMsJXXss2oKXsR1oHJ49d9yTZaSrVNFSl17N5CixkuAOnOPr9ZQ90zy4b1XfrHZfPzYvWj5LTeV=w500-h500-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczPKOr01lV825c-UFrpIHWTqaQJGOcvBxaGqEkd7TUymQV5fh_w78GU09PyDUfc19qSPBz7J7x7TyoVU0RhEke6RRbn3_aMXR5phLzLQzdV5HpV3s3iV7mpwx8RrY6LahT7UYmvlSu2DHcDGkU9O1AsRlahXxz4Ib_1p3zp24UuRbPkpY3i0SR2otqubfWb5AQseLzX8ObfDDYVpASggIgN1HrUCG0C5ev-Uc0FTN65KzHUknMH_D4jNns0BNgASFSup9KgZl1hnfuMj6Hs0Xwc6q-B_mTQrwHpfeUr3T7n7mGRl5I6Vzq9aQfWHt6B4mFr6gDcfaNlRPrnBbXJUu53hVb9r2T7MUVrzlLrEnptAqQHfezFrAL-e87WEzi5oBiK_fCHAQgBrtQKfCqNhe0CmTUmHYVT_F3oTEvt2kY6yinMKfTJ56RBtMoVwuJlLkJU7ve9X2WhuGcelnrzOFADmDIQ8HNTpvP3QtRDqGVXTSZZg8TEzwCETuAl95IMiOE5glgCsQTJA2EZ7MUp-c-CqjebjUz4VqssNl9PSn5D_Dx_x5Y8NJbw_0E4MDX-ECQm2qGYy7piiSXltsDvVVxdZcAt-s2Jk9BDblBSdtV6MJLsYVD0JWtHcnFuJB5PPIwo1fRm3_kYeoj5nP0OMbsN57KjwC_qvmrIsoUkS_qb7slWdPGzqkvlJzB7O0Avgnf9ixCkIAPjbau7T5Vry1IprVxPaVW0QqwpOcFBQZR8k-IL6dYbLgz4IhueuNtI-phql-jl4m-zxQ3d0qBoURlpR4kQavy3ZYpp7JogYuYuSF0LSNTTwoAEttziGSz6chw6e1uM_iKa4BDOgfetxnjzr__CLM6ujg-fsCz0kAtJVcYy-qHLrKV4aYvwSFkHwhXZpLD9kvm8PacnkTKatNJE1z9nWjK6-8QAGsR3DSzzBsxHPaoib_mleodaI=w459-h544-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczPtCktvR2-usQYp7O8_inrR0wv5PdmOFT9KyTpBNusnC2VVcBeAmN3CKRQ3I3PwU2Mgm0b4tunErJEJzDbrnrQOG44ZYMIBq7plru3HVxP6RYJo4HWX0DC1-Sc4XtSAhgoJ3PiR0lVd7jdSsS6LmNrtEkaxBopVS1vZQerAzcmcRzSRTjcXp1W9IqWP_Fin9iw3v01PAFiWAuCmucbuQuCouczcpsFtA83-2VVdOzDJKSs669uIFZotchDCxZf7axK2a8rAmfV7eEd5Qoa_gsYF5mgsK3X9IF5XuzZJwbbCr-hxjXKAvjwJFQenfdsaO_AywuONCOqDSk33KYYuv4myMz9f4VTevmTcuQ_7qx21z1OQ_-ZfFxlDTNwjI91ip7IgESEkjLX4VfAPsAEwVzn1WJwCc2GfIxHvBSGylNUkogymNnJlJ8eOxLGeXxL2zk33txS3PQKp0L43qhRDaHpwiyI9Mw9Btue_Ou_GJz2pca7RDQ6YL8qKt3huJvWUqsY5LEo5RhidZKeHmialHg1LCF0WzmO34P99RnesWFek37XGBYwlit4eVHaiyy-apK0UTEsRRCbVWWCvsaINkULtsTEfRBnOkFPZ6unvMg_WX1nDLzYr7y1m5RoaSpwEP37w4IVx3lbWw-9r7vu-b5ds7lgHuL2ikdYA60lRm4Kqc_TaBnxo_yoC4mvlfAzO8oraMqVvyT1Gd72_VXfjWKNkT75PYhL3sWKI2TKP8LL9HqJYEQCiZ47rjsBX5XhAjvY4KTn0gn3Gqkv0qeX5QBFeGfgNBNfNhezJ5TJ-iOP8mM32lbB1UT20doFLc0ySvDXeHLoVDm8TzdPYPspkhozIwmqkLexF4zKF6Oy3zPltA6nSHrGp4y538DQInkktaHrAw9s2I11sHqoYMFmUtxhgY1wsfDQ0Wfx18KKcmoEwHpNAC_ivvw2AR6Lk=w500-h500-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPqwcrxbkyDYgnsP-ZgboSMmwKr3MEyc2h4xCkYCwswp04MjDarAQNLANX4786EUIBvUcsrNJvqXdq0mDIL4VBWdcVVXf0nJ4T7iIS2wRWr73eNG_w3SAqHvocCFBZR_ZCbYHYkuBmzlO2vuR1tWKk2WZ-lEfc9Q7CJgP2OgcBg-pFVRPIXwTfRO4pRIkq4dX8y5hlXxjEivaLodrEmsKgQCJx_fDJ0z6dn8z9SfXcGPENh_44bUJZCCtI03zv3qkCeEuKX6W2-iPgqAiqkRloRfbKRLT5OcM3bw407S4MlKKgvSmbND8FnxRd3gbpHSQPrrcjyXvKyG4aNsWNFZe7kmNkSzxbV4_0T4a4vcKhjVoF241hNaVerjW5fX8DqGHg2hA4RpEe6sdytbi8CW4wt_7lfeKKMYpiVaozEu0xl05Xvv6PsgyJyY0t6tN1I1vKNmCxd0BA66KtL_tEPiAR019qlGkE7j3teuTSaVISgAIgAdfBJooeHAW_60Nan_fsuhqezhSAx98pEw3r-tKTTNqFbY0Fi6qv8ugaguAn9CLphMC0LetAOKPYiOWENM3PIZq48JHpGNid6mNHAJiTeApwdqJxC4ZpE6XXlPuzWoM5mub1ZwO1LMO3r4sa3ZDyHnNcaAR8WheTOqXkWtwIMOKBDGLfsRxvY1gtKr2lHPo6Wgh9VpT164M8q8-F1nqtC-iQsdIFFq7e5EtEqYs2by4LYnzxBk3k0JeGBYnDSAeBLp3V9HTYrjIXK7IOIR0foxU0V5oYY4NeQaeZh5fyb52zpQx97f1LnT2HFfXyYuiFceHUOGp8dAdTNBVWf6xYPaVKtTbkY4l2j7Ftnovh7DZRZY6Q3C9qPeXuytSeru-ba1m0IQjZFVQ_0WzSsxOAFoP9EoLMWdNRPN080fAhctYiJZEM8AwFi9V15afJ3vEitf8sUbU0grk8V=w500-h500-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczMOIxiaD6p3AH9kjz2rbPcH7pig4VuEpfYf5XExqGMZlCl8pg_uACk9oVzrSGPoP-xddaGWSTlONM_k2zrqp7C-k8MbqIMkMlbj_CbUjvmdfwCPj7cXMKoWs6-_nRCrQSwogOBaQ3PXcaCBPkFesnvPBo4oSUKyKA1IrxfUb2gsWFYpv7ijIGNi5cjdbo3Cwo_hiNoxCRmR9HIEG9v2WbiiK9GIQa3Mex5PpZ08lVVF5avu_gekL88E_KkCyhRjSd7G_ASTm3vSueTX7rBjN1Y2g17wfoWPlfg2J3ILzbPhBhzjRcSHHEnsmZmUuqMjov4-yWY_fmixzXXERJ_Ci6jGLdSJ1apMtdGDWHUPGxed-xUMt8PICWmeZtlSZpkCW4FH9nG0hv7WO896Yk_uKxeLE9ziZkuDkSzayYYPfrDNfh3ggXVpihi2X695t6kRvcWE3QKbrhY0coD9PJ10omUrnelFqBXrzFZn4t2W21sLQaJZROamj9bSzhKNWysSGHiNn1c6dHnCSVxTVhHEvWpcrtC7H7S7wBCy4cb80mIEwiGqGQn6HD0-fUixlNOR83il9s4Q6zq24SaUh7v1gqKbHJg8Fc_01sA6z9rOkKd6SBWqesjDEgNmM8n4CCMHQCPGosH6mvMWVRWyz8JmmjJ-sWOX3nWMsVksBJfVxOI2_JDgXn5ILxC0h0UMBCjNNhK7HFye-28wbcVMyZvn2XgPW26gZi1Z8LNUP52PetQ8YSsBZU7xBQTpoQ8sXlFVtlTEu5whoOTauWtwIXT1qhgXtWHxacCDJFMQjQvBxQbcmXAwXS-mH6R6vFnon0N4u8_kiDzR-2hApk2bUfhWnXPvLCMfS_0qF2VihKJeBNt54ZNYmUpqfHEZFOc3HDbRNi6kOiSm_3vIS-5O7Wyv3aODy9JEnuArwqHDTv6Xa7VpUAR9_7XcbNpIHkss=w500-h500-s-no-gm?authuser=1",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczMpgBJtblckkRT8PGjzNQ_Pl2_GWDnaRbGMW9HtpdVuZ54zimtoH_G9-KVpc0nAG-Q5ECocDJ1bcHy9cV_k_3SmWbqLxP6zX3YGfYmqnt8Q3q-2_iVN8NIUhOKAUQQ8RGQi7dODfAMl2uAuA3HLeN_u8Nt0z4wvet49AJHMpZjRBXt_KFKhBHpV8ok5jOMCQZ6O7VHQst8csOCf7rrRWJnRD6Wk-9Wt7mAQHSC17w_AQNKuZy4FJD-nizbW2Ks2ifC4NubB_00V5wCcZJmJzyk8GZ0Ll5-iyGDxnpDECCuDKDL7VJKhEw742GZ_nRF3WPSiki4H-SFPnLrzxjV6zIqa02NViCTSx-rOapeEKQ024v8ysC1cfrv7uwdA9rZ_TSDCd75fbbsdu1qAuAduXVcJ3OTJJxwVhfbWPikGsyPmYna6mz_ZkYzHs5XOZa5Egobjo1uJ_YUq0bYvDYt_Emk1sUACa4KtEOHnK2y0IuGfnTMw_tVFpP9EOku0rRkng0O8L7b9cRF0ltwgBxd095KNcfQsdPSOAAAQ5Py5gLcfSbCV7ASoUvMNCuTgV_cAO8Bfb_smsmhZR6SRWF3G2PlXoAbUmLBwgVStB_s8UYq29E2MLPHUJNN2dMxA49o1vdWSLc8EFNclKaEeIE4JvYbGMeC3jNKH3cV9OcWF66-50IDxOo0FmuIEhHwkSrcGmjC_NSy03V91R4vRPUftS9V0kzyMgosCfYuxHThWLsjRjJb2LLM-SQguhW1dQAMAW9iVgdxstBwbjrcLjH2zeDiqPWqLVFxaOcW6dw1bDqIAsMWNcnG-zoMTjhGm-l8N3FYCsmR99neieqwS37MOIgZGXfSrcD4pN8JKdefe1GIAJE_0N4hqH9XMjve8ODKnLxXJTZ2u4UWNSbhaq0znEzug6qQ1biGa4pWzKePl5_zaXYVByHEitTpMjAL6=w418-h418-s-no-gm?authuser=1",
  //1
  "https://lh3.googleusercontent.com/pw/AP1GczMJJqqPDjcDy50MsyBA_UnISUo5nHx8AKAYYMGloFm7ROSsOksYTlanhqTXe7MOMcddrIwX6aIm5nf1ZeF7faISZAMAasJoxReTGD5JiAxxwb4A5GMXhR4UoYMctGYeMcgHb1f2lM63jL2iapMwphr3EgJrPwxgAOqS-Zt-8b6u1mYzD3sBksFFvGlX1ezwyzkO4VlOiqFMZS2Rurk0prdTm1au8PCNVbkxonhq06c73jla1vDjshwBnK0Obi2I2a91GUfZNFItJZyY_Oea1MquplHfhFdnvBfi-AWQ3hJHJf2bZXaYaq3fFW9o3aGPhmJenQARUAAhbK1OyPBo_2vJlS1geypBm6A5acgKecsuUF4qk88PULEe_XNNhA7EaP4kj8I1zIKfhxtldaFHbj86ZMhFsLPC5Q3lVvGgtYnBkMlxu5DHyZkUHy2jwbsio3ibG7jejS_ZU33BeyQVKl3hPGXUs2drlPRz9Tw35HoUvDErMgYf5NOU_n84_XQ7mr1pebU82rm4V7DSF_CVFoN2YEumTNuHckRh-PPEyYBuO3zwjBKxgPPvHFkNRp0oOtKafDjlA5kWuOOmLS1Tw4Vx-ba-2AYvnVdghPW3VR0S9ATchL1NiqUxOJGSAA4id0XQNQ4M7BEcwO28gJ4-4faLXi7t9MkDRT9DjnH2-p2FTANBKmiYh-Y5ibq2pj90Oj0o5tTo0f6oPTJ4eXSq9e2O7tB68EMuRz4rs3IkQrrOBBYBCnMlsvvVxKXa3eowDX6ip0QhOmFXfYLZdziHFdw49O0e6zI48aIdNmDnjnRIDk5F41PvWAzcm5LE4WO82_OkrNv9e2h2_KvXfCaHQsKJVak55mUM2q04lgbFgJwb9xb6b2Bw9aqPkF5zJxFliIlrSH8RalsCFrGVe6TRIaIffwpUYWDz4liJY6WH07OEjlCV78-dxGUreOwJ=w483-h517-s-no-gm?authuser=1",
  //2
  "https://lh3.googleusercontent.com/pw/AP1GczOykB-FssTdJkOm5r9a6Q5ojDQj3j6t2jwbgDnxz05DHaoRrxxtfCcodEgPJC7PMnnLaTMDFrU6nkBkntKKEr5zgl29XS5tG1Qgd0gIu89hMDLiXiEuV7YTEjJkP2hnWV8s_zoschle9JD0sipNoTfjFZSaP1y5ZaezhkxDWi_lA9WAZWNJfqi0OhydpeiKGlOm6iEe5bI3r3B6_fKzyMZVUCVnsarGhZx3G1fYXYItM3tUz-BV5e15QJhaRTy64RuoKkX0Zeqoq4kyy5FvEkZdS3d3BATEOLuMCwa-GzgUCed_JaZA-MOndNo3g_lQph5Y86Ny82TCgnLLmRZ7PGS5GYyAfA8vLCu_KP4epaGRfiZuCDwaX-mL8pofLGkQ3SGDILCuhUTkZWsOB2ElEtIOFvt2ZA5K8Im-bqcgIFAQcrhdjkYYVgRGc7FeiL0jX5V1xy-npUhqAHkjUJDQNjp6Gj1sFZYZhPMpTHLRuNxxYp5RjDSVqlTYHksIS52gcQSYlrSjcLsMAt5p1uj9A7OhIs14HBYmYOw5mAdBWEnLTeQeJKdF9JsmcuQWaztaKhIWFscZUSNNqbsBfNV-w-D4Xk5cKkApDzM0bXriE8d5GW1BUedjMFvbT5ZndenZEv6F7FWxCaWvVIZqaFBaxxvEV7OSmeVuNAyNlztb9_BBl2T9NstXqy7aLIE7J4GpDQx_JPaLPOeifaKDIyF-G9qh8_2qD71146d4BOFMD5flvQ-2fRYK5GT4dDj5DbcSEtPbQkxh8-vth2_9HnfY15C4_PTLT3daCVpDYmCgG4iXCeD6A5Ji12egEfTNel-9Y0KdZ8qucHcPERHQR03IYeLTh8c4UKd-arQ775sY1zwGlWueL4ZkXtwkoTHOgdvD9Wl-1xRl6bi3jtNuo224uK_SVtapHEDBcvfR_tH0mCBFtve6-C1f552euzp1=w400-h400-s-no-gm?authuser=1",
  //3
  "https://lh3.googleusercontent.com/pw/AP1GczO0Fm0lM2qPATNv_cU-Oat57I4U7g95c8EQIwCeOyP0C7Vu2D2ubtcYqojP9ORRPPaulSzDpTRzQM0ZX-qeh6m3-IxwTu63vfrrD230MjkEZLxlY8rtc9ujdcW5vcGt9DOQuDUK08SZ8ZlQx2T9ZSq-HuNxvz83XHkoP2iZqlW85p4r95DvDqhuqO-ia1V9PB7PyPPjqblXSwIo6rA-PDmlJa-bg9rXnmQh9Xt1bbOkpTxZKpaNfQwRYgK792fKnVqhMchrAeU8gHXdVrX5UpW2jHw6qdrP-xI1ASwMNUUfJK94b5LFSGk5jeWfyaOAiBbvpUVXMUD4PMGCvCqkQpQJHkRybDjnJHUR2PzZD0a-m2S9qK3dMZitj9a8AvBisQ9HpzVNDspHPWBAbJaHvDFVlOi2Kg83Ri-JW0ySy5g2O1odhiSM0gZ_RWFN1fIPQosxs1SalK8Df_YoggL1uR3jFs93C6pFhiKoTygUaNtIe-cYYtKJFHhFGkIbwTWhrcczjPmcv2S9JOGo6kNXRO1Xl9f2aG4yEixI9pGffOnuJZ2AzG4-CCg1aj6Zj67tev5YRp8japRqJ3XZdWaqVK368vjP_8Tqdqdfb1Wy8kJjq26a5h_ym6F12B_17y38nvm9VNfK3H1slwY8vc9hrYAq3toGS270FRpj-9gLmw1rwuUdwF87UAZfVaLs8-8XBF-GnmR-P1sUJ06yMCnPkee0znFBDyT7-x-KuCgQdfWGA3Cvri0mTw625zCf1BFmu3jKKE0hv_c9XnpQmWQQiMluLzkjVSGFSJrjHGhNLimB0lCyOjrm6fpQKnCtafeQQE-_9AIu2BSzPCqoMdfijoZsjJCSqYV1jBsZI4N6zaj2-4o01RMsJXXss2oKXsR1oHJ49d9yTZaSrVNFSl17N5CixkuAOnOPr9ZQ90zy4b1XfrHZfPzYvWj5LTeV=w500-h500-s-no-gm?authuser=1",
  //4
  "https://lh3.googleusercontent.com/pw/AP1GczPKOr01lV825c-UFrpIHWTqaQJGOcvBxaGqEkd7TUymQV5fh_w78GU09PyDUfc19qSPBz7J7x7TyoVU0RhEke6RRbn3_aMXR5phLzLQzdV5HpV3s3iV7mpwx8RrY6LahT7UYmvlSu2DHcDGkU9O1AsRlahXxz4Ib_1p3zp24UuRbPkpY3i0SR2otqubfWb5AQseLzX8ObfDDYVpASggIgN1HrUCG0C5ev-Uc0FTN65KzHUknMH_D4jNns0BNgASFSup9KgZl1hnfuMj6Hs0Xwc6q-B_mTQrwHpfeUr3T7n7mGRl5I6Vzq9aQfWHt6B4mFr6gDcfaNlRPrnBbXJUu53hVb9r2T7MUVrzlLrEnptAqQHfezFrAL-e87WEzi5oBiK_fCHAQgBrtQKfCqNhe0CmTUmHYVT_F3oTEvt2kY6yinMKfTJ56RBtMoVwuJlLkJU7ve9X2WhuGcelnrzOFADmDIQ8HNTpvP3QtRDqGVXTSZZg8TEzwCETuAl95IMiOE5glgCsQTJA2EZ7MUp-c-CqjebjUz4VqssNl9PSn5D_Dx_x5Y8NJbw_0E4MDX-ECQm2qGYy7piiSXltsDvVVxdZcAt-s2Jk9BDblBSdtV6MJLsYVD0JWtHcnFuJB5PPIwo1fRm3_kYeoj5nP0OMbsN57KjwC_qvmrIsoUkS_qb7slWdPGzqkvlJzB7O0Avgnf9ixCkIAPjbau7T5Vry1IprVxPaVW0QqwpOcFBQZR8k-IL6dYbLgz4IhueuNtI-phql-jl4m-zxQ3d0qBoURlpR4kQavy3ZYpp7JogYuYuSF0LSNTTwoAEttziGSz6chw6e1uM_iKa4BDOgfetxnjzr__CLM6ujg-fsCz0kAtJVcYy-qHLrKV4aYvwSFkHwhXZpLD9kvm8PacnkTKatNJE1z9nWjK6-8QAGsR3DSzzBsxHPaoib_mleodaI=w459-h544-s-no-gm?authuser=1",
  //5
  "https://lh3.googleusercontent.com/pw/AP1GczPtCktvR2-usQYp7O8_inrR0wv5PdmOFT9KyTpBNusnC2VVcBeAmN3CKRQ3I3PwU2Mgm0b4tunErJEJzDbrnrQOG44ZYMIBq7plru3HVxP6RYJo4HWX0DC1-Sc4XtSAhgoJ3PiR0lVd7jdSsS6LmNrtEkaxBopVS1vZQerAzcmcRzSRTjcXp1W9IqWP_Fin9iw3v01PAFiWAuCmucbuQuCouczcpsFtA83-2VVdOzDJKSs669uIFZotchDCxZf7axK2a8rAmfV7eEd5Qoa_gsYF5mgsK3X9IF5XuzZJwbbCr-hxjXKAvjwJFQenfdsaO_AywuONCOqDSk33KYYuv4myMz9f4VTevmTcuQ_7qx21z1OQ_-ZfFxlDTNwjI91ip7IgESEkjLX4VfAPsAEwVzn1WJwCc2GfIxHvBSGylNUkogymNnJlJ8eOxLGeXxL2zk33txS3PQKp0L43qhRDaHpwiyI9Mw9Btue_Ou_GJz2pca7RDQ6YL8qKt3huJvWUqsY5LEo5RhidZKeHmialHg1LCF0WzmO34P99RnesWFek37XGBYwlit4eVHaiyy-apK0UTEsRRCbVWWCvsaINkULtsTEfRBnOkFPZ6unvMg_WX1nDLzYr7y1m5RoaSpwEP37w4IVx3lbWw-9r7vu-b5ds7lgHuL2ikdYA60lRm4Kqc_TaBnxo_yoC4mvlfAzO8oraMqVvyT1Gd72_VXfjWKNkT75PYhL3sWKI2TKP8LL9HqJYEQCiZ47rjsBX5XhAjvY4KTn0gn3Gqkv0qeX5QBFeGfgNBNfNhezJ5TJ-iOP8mM32lbB1UT20doFLc0ySvDXeHLoVDm8TzdPYPspkhozIwmqkLexF4zKF6Oy3zPltA6nSHrGp4y538DQInkktaHrAw9s2I11sHqoYMFmUtxhgY1wsfDQ0Wfx18KKcmoEwHpNAC_ivvw2AR6Lk=w500-h500-s-no-gm?authuser=1",
  //6
  "https://lh3.googleusercontent.com/pw/AP1GczPqwcrxbkyDYgnsP-ZgboSMmwKr3MEyc2h4xCkYCwswp04MjDarAQNLANX4786EUIBvUcsrNJvqXdq0mDIL4VBWdcVVXf0nJ4T7iIS2wRWr73eNG_w3SAqHvocCFBZR_ZCbYHYkuBmzlO2vuR1tWKk2WZ-lEfc9Q7CJgP2OgcBg-pFVRPIXwTfRO4pRIkq4dX8y5hlXxjEivaLodrEmsKgQCJx_fDJ0z6dn8z9SfXcGPENh_44bUJZCCtI03zv3qkCeEuKX6W2-iPgqAiqkRloRfbKRLT5OcM3bw407S4MlKKgvSmbND8FnxRd3gbpHSQPrrcjyXvKyG4aNsWNFZe7kmNkSzxbV4_0T4a4vcKhjVoF241hNaVerjW5fX8DqGHg2hA4RpEe6sdytbi8CW4wt_7lfeKKMYpiVaozEu0xl05Xvv6PsgyJyY0t6tN1I1vKNmCxd0BA66KtL_tEPiAR019qlGkE7j3teuTSaVISgAIgAdfBJooeHAW_60Nan_fsuhqezhSAx98pEw3r-tKTTNqFbY0Fi6qv8ugaguAn9CLphMC0LetAOKPYiOWENM3PIZq48JHpGNid6mNHAJiTeApwdqJxC4ZpE6XXlPuzWoM5mub1ZwO1LMO3r4sa3ZDyHnNcaAR8WheTOqXkWtwIMOKBDGLfsRxvY1gtKr2lHPo6Wgh9VpT164M8q8-F1nqtC-iQsdIFFq7e5EtEqYs2by4LYnzxBk3k0JeGBYnDSAeBLp3V9HTYrjIXK7IOIR0foxU0V5oYY4NeQaeZh5fyb52zpQx97f1LnT2HFfXyYuiFceHUOGp8dAdTNBVWf6xYPaVKtTbkY4l2j7Ftnovh7DZRZY6Q3C9qPeXuytSeru-ba1m0IQjZFVQ_0WzSsxOAFoP9EoLMWdNRPN080fAhctYiJZEM8AwFi9V15afJ3vEitf8sUbU0grk8V=w500-h500-s-no-gm?authuser=1",
  //7
  "https://lh3.googleusercontent.com/pw/AP1GczMOIxiaD6p3AH9kjz2rbPcH7pig4VuEpfYf5XExqGMZlCl8pg_uACk9oVzrSGPoP-xddaGWSTlONM_k2zrqp7C-k8MbqIMkMlbj_CbUjvmdfwCPj7cXMKoWs6-_nRCrQSwogOBaQ3PXcaCBPkFesnvPBo4oSUKyKA1IrxfUb2gsWFYpv7ijIGNi5cjdbo3Cwo_hiNoxCRmR9HIEG9v2WbiiK9GIQa3Mex5PpZ08lVVF5avu_gekL88E_KkCyhRjSd7G_ASTm3vSueTX7rBjN1Y2g17wfoWPlfg2J3ILzbPhBhzjRcSHHEnsmZmUuqMjov4-yWY_fmixzXXERJ_Ci6jGLdSJ1apMtdGDWHUPGxed-xUMt8PICWmeZtlSZpkCW4FH9nG0hv7WO896Yk_uKxeLE9ziZkuDkSzayYYPfrDNfh3ggXVpihi2X695t6kRvcWE3QKbrhY0coD9PJ10omUrnelFqBXrzFZn4t2W21sLQaJZROamj9bSzhKNWysSGHiNn1c6dHnCSVxTVhHEvWpcrtC7H7S7wBCy4cb80mIEwiGqGQn6HD0-fUixlNOR83il9s4Q6zq24SaUh7v1gqKbHJg8Fc_01sA6z9rOkKd6SBWqesjDEgNmM8n4CCMHQCPGosH6mvMWVRWyz8JmmjJ-sWOX3nWMsVksBJfVxOI2_JDgXn5ILxC0h0UMBCjNNhK7HFye-28wbcVMyZvn2XgPW26gZi1Z8LNUP52PetQ8YSsBZU7xBQTpoQ8sXlFVtlTEu5whoOTauWtwIXT1qhgXtWHxacCDJFMQjQvBxQbcmXAwXS-mH6R6vFnon0N4u8_kiDzR-2hApk2bUfhWnXPvLCMfS_0qF2VihKJeBNt54ZNYmUpqfHEZFOc3HDbRNi6kOiSm_3vIS-5O7Wyv3aODy9JEnuArwqHDTv6Xa7VpUAR9_7XcbNpIHkss=w500-h500-s-no-gm?authuser=1",
  //8
  "https://lh3.googleusercontent.com/pw/AP1GczMpgBJtblckkRT8PGjzNQ_Pl2_GWDnaRbGMW9HtpdVuZ54zimtoH_G9-KVpc0nAG-Q5ECocDJ1bcHy9cV_k_3SmWbqLxP6zX3YGfYmqnt8Q3q-2_iVN8NIUhOKAUQQ8RGQi7dODfAMl2uAuA3HLeN_u8Nt0z4wvet49AJHMpZjRBXt_KFKhBHpV8ok5jOMCQZ6O7VHQst8csOCf7rrRWJnRD6Wk-9Wt7mAQHSC17w_AQNKuZy4FJD-nizbW2Ks2ifC4NubB_00V5wCcZJmJzyk8GZ0Ll5-iyGDxnpDECCuDKDL7VJKhEw742GZ_nRF3WPSiki4H-SFPnLrzxjV6zIqa02NViCTSx-rOapeEKQ024v8ysC1cfrv7uwdA9rZ_TSDCd75fbbsdu1qAuAduXVcJ3OTJJxwVhfbWPikGsyPmYna6mz_ZkYzHs5XOZa5Egobjo1uJ_YUq0bYvDYt_Emk1sUACa4KtEOHnK2y0IuGfnTMw_tVFpP9EOku0rRkng0O8L7b9cRF0ltwgBxd095KNcfQsdPSOAAAQ5Py5gLcfSbCV7ASoUvMNCuTgV_cAO8Bfb_smsmhZR6SRWF3G2PlXoAbUmLBwgVStB_s8UYq29E2MLPHUJNN2dMxA49o1vdWSLc8EFNclKaEeIE4JvYbGMeC3jNKH3cV9OcWF66-50IDxOo0FmuIEhHwkSrcGmjC_NSy03V91R4vRPUftS9V0kzyMgosCfYuxHThWLsjRjJb2LLM-SQguhW1dQAMAW9iVgdxstBwbjrcLjH2zeDiqPWqLVFxaOcW6dw1bDqIAsMWNcnG-zoMTjhGm-l8N3FYCsmR99neieqwS37MOIgZGXfSrcD4pN8JKdefe1GIAJE_0N4hqH9XMjve8ODKnLxXJTZ2u4UWNSbhaq0znEzug6qQ1biGa4pWzKePl5_zaXYVByHEitTpMjAL6=w418-h418-s-no-gm?authuser=1",
];
  links.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = links[i];

    card.addEventListener("click", flipCard);
  });
}

function resetGame() {
  clearInterval(timerInterval);
  shuffleCard();
  timerDisplay.textContent = "00:00";
}

resetButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", function () {
  congrats.style.display = "none";
});

document.addEventListener("DOMContentLoaded", shuffleCard);

//play gomb alapértelmezett körvonal hozzáadása -> zene automatikus lejátszása miatt
window.onload = function () {
  play.classList.add("outlined");
};

// zene lejátszása és megállítása
play.addEventListener("click", function () {
  audio.play();
});

pause.addEventListener("click", function () {
  audio.pause();
});

// play gomb megnyomásakor megjelenik a körvonal, pause gombról eltűnik
audio.onplay = function () {
  play.classList.add("outlined");
  pause.classList.remove("outlined");
};

// pause gomb megnyomásakor megjelenik a körvonal, play gombról eltűnik
audio.onpause = function () {
  play.classList.remove("outlined");
  pause.classList.add("outlined");
};
