import { Grid, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import AmountWithDiscountedAmount from "../AmountWithDiscountedAmount";
import CustomImageContainer from "../CustomImageContainer";
import CustomRatingBox from "../CustomRatingBox";
import ImageBottomBox from "../ImageBottomBox";
import OrganicTag from "../organic-tag";
import RecommendTag from "../recommendTag";
import Body2 from "../typographies/Body2";
import AddWithIncrementDecrement from "./AddWithIncrementDecrement";
import { CustomOverLay } from "./Card.style";
import QuickView, { PrimaryToolTip } from "./QuickView";

const VegNonVegFlag = styled(Box)(({ theme, veg }) => ({
  height: "14px",
  width: "14px",
  color: veg === "true" ? theme.palette.primary.customType3 : "red",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
}));
const Circle = styled(Box)(({ theme, veg }) => ({
  height: "10px",
  width: "10px",
  backgroundColor: veg === "true" ? theme.palette.primary.customType3 : "red",
  borderRadius: "50%",
}));

export const FoodVegNonVegFlag = ({ veg }) => {
  return (
    <VegNonVegFlag veg={veg}>
      <Circle veg={veg} />
    </VegNonVegFlag>
  );
};
const SpecialCard = (props) => {
  const {
    item,
    imageBaseUrl,
    quickViewHandleClick,
    addToCart,
    handleBadge,
    isProductExist,
    handleIncrement,
    handleDecrement,
    count,
    showAddtocart,
    handleClick,
    updateLoading,
    setOpenLocationAlert,
    isLoading,
  } = props;

  const { configData } = useSelector((state) => state.configData);

  const classes = textWithEllipsis();
  const [isHover, setIsHover] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getModuleWiseItemName = () => {
    if (getCurrentModuleType() === ModuleTypes.FOOD) {
      return (
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
            <Typography
              className={classes.singleLineEllipsis}
              fontSize={{ xs: "12px", md: "14px" }}
              fontWeight="500"
            >
              {item?.name}
            </Typography>
          </PrimaryToolTip>
          <FoodVegNonVegFlag veg={item?.veg == 0 ? false : true} />
        </Stack>
      );
    } else {
      return (
        <PrimaryToolTip text={item?.name} placement="bottom" arrow="false">
          <Typography
            className={classes.singleLineEllipsis}
            fontSize={{ xs: "12px", md: "14px" }}
            fontWeight="500"
          >
            {item?.name}
          </Typography>
        </PrimaryToolTip>
      );
    }
  };

  return (
    <CustomStackFullWidth
      sx={{
        padding: "10px",
        cursor: "pointer",
        background: (theme) => theme.palette.neutral[100],
        // boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
        borderRadius: "10px",
        width: { xs: "190px", md: "230px" },
        height: "100%",
        "&:hover": {
          img: {
            transform: "scale(1.05)",
          },
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
    >
      <CustomStackFullWidth
        sx={{
          position: "relative",
          height: { xs: "140px", md: "180px" },
        }}
      >
        {<RecommendTag status={item?.recommended} top="70px" />}
        {<OrganicTag status={item?.organic} top="40px" />}
        {handleBadge()}
        <Box borderRadius="8px" overflow="hidden">
          <CustomImageContainer
            src={`${imageBaseUrl}/${item?.image}`}
            // alt={item?.title}
            height="100%"
            width="100%"
            objectfit="cover"
          />
        </Box>
        <CustomOverLay hover={isHover}>
          <QuickView
            quickViewHandleClick={quickViewHandleClick}
            // item={item}
            isHover={isHover}
            noWishlist
            // addToWishlistHandler={addToWishlistHandler}
            // removeFromWishlistHandler={removeFromWishlistHandler}
            // isWishlisted={isWishlisted}
            isProductExist={isProductExist}
            addToCartHandler={addToCart}
            showAddtocart={!isProductExist}
            isLoading={isLoading}
            updateLoading={updateLoading}
            setOpenLocationAlert={setOpenLocationAlert}
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
          >
            <AddWithIncrementDecrement
              verticalCard
              onHover={isHover}
              addToCartHandler={addToCart}
              isProductExist={isProductExist}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              setIsHover={() => setIsHover(true)}
              count={count}
              isLoading={isLoading}
              updateLoading={updateLoading}
            />
          </Box>
        </CustomOverLay>
        <ImageBottomBox
          delivery_time={item?.delivery_time}
          free_delivery={item?.free_delivery}
        />
      </CustomStackFullWidth>
      <CustomStackFullWidth mt="15px" sx={{ padding: "5px" }} spacing={0.5}>
        {getModuleWiseItemName()}
        <Body2 text={item?.store_name} />
      </CustomStackFullWidth>
      <CustomBoxFullWidth sx={{ padding: "0px 5px 5px 5px" }}>
        <Grid container>
          <Grid item xs={9.5} sm={9}>
            <AmountWithDiscountedAmount item={item} />
          </Grid>
          <Grid item xs={2.5} sm={3}>
            <CustomRatingBox rating={item?.avg_rating} />
          </Grid>
        </Grid>
      </CustomBoxFullWidth>
    </CustomStackFullWidth>
  );
};

SpecialCard.propTypes = {};

export default SpecialCard;
