import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Banner";
import Coinlist from "@/components/sections/Coinlist";
export default function Home() {

    return (
        <>
            <Layout>
                <Banner />
                <Coinlist />
            </Layout>
        </>
    );
}