import ProductList from "./components/productlist";
 
const Page: React.FC = () => {
  return(
    <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr] gap-8 p-6 md:p-8 lg:p-10"> 
        <div> 
        <div>
            <ProductList />
         </div>
        </div>
    </main>
  );
};

export default Page;