import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams {
  orderId?: string;
}

const Order = async (props: { params: Promise<IPrams> }) => {
  const params = await props.params;
  const order = await getOderById(params);

  if (!order) return <NullData title="No Order"></NullData>;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
