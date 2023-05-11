-- CUSTOMER

insert into CUSTOMERS (CUSTOMERSID ,FIRST_NAME,LAST_NAME , EMAIL ,PHONE_NUMBER ,LINE ,CITY ,COUNTRY ,DATE_REGISTERED ,IS_DELETE )
values (1001,'cu1', 'hehe','cu1@gmail.com','  ',' ', ' ', 'Viet Nam', CURRENT_DATE(),FALSE);

insert into CUSTOMERS (CUSTOMERSID ,FIRST_NAME,LAST_NAME , EMAIL ,PHONE_NUMBER ,LINE ,CITY ,COUNTRY ,DATE_REGISTERED ,IS_DELETE )
values (1002,'cu2', 'hehe','cu2@gmail.com','  ',' ', ' ', 'Viet Nam', CURRENT_DATE(),FALSE);

insert into CUSTOMERS (CUSTOMERSID ,FIRST_NAME,LAST_NAME , EMAIL ,PHONE_NUMBER ,LINE ,CITY ,COUNTRY ,DATE_REGISTERED ,IS_DELETE )
values (1003,'cu3', 'hehe','cu3@gmail.com','  ',' ', ' ', 'Viet Nam', CURRENT_DATE(),FALSE);

-- ACCOUNT

insert into ACCOUNT (ID ,USER_NAME ,PASSWORD ,ROLE ,CUSTOMER_ID ,ENABLE ) 
values (1001, 'vanthong', '$2a$10$tEeYfFCFc8E7c68BGc9qE.6UrsIO1G.5zXfSklFxCSV2Eonetupm2','US',1001,true);

insert into ACCOUNT (ID ,USER_NAME ,PASSWORD ,ROLE ,CUSTOMER_ID ,ENABLE ) 
values (1002, 'sa', '1','US',1002,false);

insert into ACCOUNT (ID ,USER_NAME ,PASSWORD ,ROLE ,CUSTOMER_ID ,ENABLE ) 
values (1003, 'ad', '1','AD',1003,false);

-- CATEGORIES

insert into CATEGORIES (CATEGORYID ,CATEGORY_NAME )
values (1, 'T-SHRT');

insert into CATEGORIES (CATEGORYID ,CATEGORY_NAME )
values (2, 'SHIRT');

insert into CATEGORIES (CATEGORYID ,CATEGORY_NAME )
values (3, 'HAT');

-- SIZE

insert into SIZE (SIZEID ,SIZE_NAME ,DESCRIPTION )
values (1 , 'S' , '91-96 cm');

insert into SIZE (SIZEID ,SIZE_NAME ,DESCRIPTION )
values (2 , 'M' , '96-101 cm');

insert into SIZE (SIZEID ,SIZE_NAME ,DESCRIPTION )
values (3 , 'L' , '101-106 cm');

insert into SIZE (SIZEID ,SIZE_NAME ,DESCRIPTION )
values (4 , 'XL' , '106-111 cm');

-- PRODUCT

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (1, ' Short-Sleeve Woven Blouse ',  'PRODUCT' ,'This elevated blouse features clean lines and a lightweight fabric ideal for layering',20,23, 'https://m.media-amazon.com/images/I/A1Iv4Ahm7kL._AC_UX342_.jpg',1);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (2, ' Hoodie Sweatshirt ',  'PRODUCT' ,'A must-have pick for distinctive style, this full zip hooded sweatshirt is a fun choice for everyday wear',10,14, 'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',2);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (3, '  Womens Surplice Dress  ',  'PRODUCT' ,'Fitted through chest and waist; flared to hem',20,23.9, 'https://m.media-amazon.com/images/I/71CjOxKqIuL._AC_UY550_.jpg',3);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (4, '  Legendary Whitetails Mens Non-Typical Long Sleeve T-Shirt  ',  'PRODUCT' ,'Extended tail and side vents ',20,24, 'https://m.media-amazon.com/images/I/81VFQ0g67SL._AC_UX522_.jpg',3);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (5, '  Legendary Whitetails Mens Traditional  ',  'PRODUCT' ,'PERFECT WEIGHT: Weighing in at 5.1 ounces',30,34, 'https://m.media-amazon.com/images/I/91ydf4NUPUL._AC_SX679_.jpg',1);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (6, '  The Drop Womens Dakota Belted Mini Shirt Dress  ',  'PRODUCT' ,'This dress has a length of 36/91 cm in a size S and 39"/99cm in a size XXL',20,21.47, 'https://m.media-amazon.com/images/I/81EthDmYASL._AC_UX466_.jpg',2);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (7, '  Dockers Mens Faux Shearling Midlength Overcoat ',  'PRODUCT' ,'FEATURES: Sherpa interior and sherpa spread collar with ',90,99, 'https://m.media-amazon.com/images/I/71yH3c3ICgL._AC_UX569_.jpg',1);

insert into PRODUCTS (PRODUCTID ,PRODUCT_NAME,PRODUCT_TYPE ,DESCRIPTION ,BUY_PRICE ,SELL_PRICE ,IMAGE_URL,CATEGORY_ID  )
values (8, '  Flexfit Cotton Twill Fitted Cap  ','PRODUCT' ,  'Great-Looking Baseball Hats for Men and Women: These blank 6-panel Flexfit hats feature',10,18.65, 'https://m.media-amazon.com/images/I/81YmRM8QsNL._AC_UX679_.jpg',1);

--PRODUCTS_SIZES

insert into PRODUCTS_SIZES   (SIZE_ID ,PRODUCT_ID )
values (1,1);

insert into PRODUCTS_SIZES   (SIZE_ID ,PRODUCT_ID )
values (2,1);

insert into PRODUCTS_SIZES   (SIZE_ID ,PRODUCT_ID )
values (3,1);

insert into PRODUCTS_SIZES   (SIZE_ID ,PRODUCT_ID )
values (1,2);

insert into PRODUCTS_SIZES   (SIZE_ID ,PRODUCT_ID )
values (2,2);

--ORDER


--ORDERDETAIL

