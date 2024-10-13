import { Link } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ type }) => {
  return (
    <Grid
      m="20px 10px"
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(1,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat(3,1fr)",
      }}
      gap={6}
    >
      {type.map((ele) => (
        <GridItem key={ele._id}>
          <Link to={`/products/${ele._id}`}>
            <Box
              position="relative"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="3%"
              p="10px"
              _hover={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              mb="7"
            >
              <Box>
                <Image
                  m="auto"
                  width="80%"
                  src={ele.image}
                  alt={ele.name}
                  _hover={{ transform: "scale(1.1)" }}
                />

                <Box p="10px">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex
                      w="25%"
                      borderRadius="20px"
                      alignItems="center"
                      gap="5px"
                      p="5px 10px"
                      bgColor="#eeeef5"
                      fontSize="15px"
                    >
                      <Text>
                        {ele.rating || (Math.random() * (5 - 1) + 1).toFixed(1)}
                      </Text>
                      <AiFillStar size="15px" color="#0fbd95" />
                      <Text>
                        {ele.userRated || Math.floor(Math.random() * 999 + 1)}
                      </Text>
                    </Flex>
                  </Flex>

                  <Text
                    mt="5px"
                    fontWeight="700"
                    color="#000042"
                    fontSize="15px"
                    textTransform="capitalize"
                  >
                    {ele.productRefLink}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="400"
                    color="gray.400"
                    fontSize="14px"
                  >
                    {ele.name}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="400"
                    color="#000042"
                    fontSize="14px"
                  >
                    Shape: {(ele.shape && Array.isArray(ele.shape) ? ele.shape.join(", ") : "Not specified")}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="700"
                    color="#0fbd95"
                    fontSize="18px"
                  >
                    ₹ {ele.price}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProductCard;
