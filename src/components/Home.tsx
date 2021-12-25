import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firestore from "../firebaseinit/firebaseinit";
import Product from "./Product";
interface Props {}

interface Item {
  Id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
}
const Home = (props: Props) => {
  const [FirstRow, setFirstRow] = useState<any>([]);
  const [SecondRow, setSecondRow] = useState<any>([]);
  const [ThirdRow, setThirdRow] = useState<any>([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const itemCol = collection(firestore, "Items");
    const productSnapshot = await getDocs(itemCol);
    var temp: any[] = [];
    productSnapshot.docs.map((doc) => {
      temp.push({ Id: doc.id, ...doc.data() });
    });

    const firstRow = temp.slice(0, 2);
    const secondRow = temp.slice(2, 5);
    const thirdRow = temp.slice(5, 6);

    setFirstRow(firstRow);
    setSecondRow(secondRow);
    setThirdRow(thirdRow);
  };
  return (
    <Section>
      <Banner src="images/banner.png" />
      <RowOne>
        {FirstRow &&
          FirstRow.map((e: Item) => (
            <Product
              Id={e.Id}
              image={e.image}
              price={e.price}
              rating={e.rating}
              title={e.title}
              key={e.Id}
            />
          ))}
      </RowOne>
      <RowOne>
        {SecondRow &&
          SecondRow.map((e: Item) => (
            <Product
              Id={e.Id}
              image={e.image}
              price={e.price}
              rating={e.rating}
              title={e.title}
              key={e.Id}
            />
          ))}
      </RowOne>
      <RowOne>
        {ThirdRow &&
          ThirdRow.map((e: Item) => (
            <Product
              Id={e.Id}
              image={e.image}
              price={e.price}
              rating={e.rating}
              title={e.title}
              key={e.Id}
            />
          ))}
      </RowOne>
    </Section>
  );
};

const Banner = styled.img`
  width: 100%;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: -1;
  margin-bottom: -150px;
`;

const RowOne = styled.div`
  display: flex;
  z-index: 1;
  margin-left: 5px;
  margin-right: 5px;
`;
const Section = styled.div`
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(234, 237, 237);
`;
export default Home;
