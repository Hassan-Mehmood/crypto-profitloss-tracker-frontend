"use client";

import { redirect } from "next/navigation";
import { getUserCookie } from "../actions/cookiesActions";
import { serverApi } from "../axios";
import CreatePortfolio from "./components/CreatePortfolio";
import { SelectPortfolio } from "./components/SelectPortfolio";
import { useQuery } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export type Portfolio = {
  id: string;
  name: string;
  userId: string;
};

export default function PortfolioPage() {
  const [activePortfolio, setActivePortfolio] = useState<string | undefined>(
    undefined,
  );

  const { data: portfolios, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const response = await serverApi.get<Portfolio[]>(
        "/portfolio/get-all-portfolios",
      );
      return response.data;
    },
  });

  const { data: portfolioData } = useQuery({
    queryKey: ["portfolioData", activePortfolio],
    queryFn: async () => {
      const response = await serverApi.get<Portfolio>(
        `/portfolio/get-portfolio/${activePortfolio}`,
      );
      return response.data;
    },

    enabled: !!activePortfolio,
  });

  console.log(portfolioData);

  useEffect(() => {
    if (portfolios?.length && !activePortfolio) {
      setActivePortfolio(portfolios[0].id);
    }
  }, [portfolios, activePortfolio, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {portfolios?.length === 0 ? (
        <CreatePortfolio />
      ) : (
        <Tabs value={activePortfolio} onValueChange={setActivePortfolio}>
          <div className="flex items-center gap-2">
            <TabsList className="flex items-center justify-start gap-2 bg-transparent">
              {portfolios?.map((portfolio) => (
                <TabsTrigger
                  key={portfolio.id}
                  value={portfolio.id}
                  className="data-[state=active]:bg-[#34af008e] data-[state=active]:text-[#52863c]"
                >
                  {portfolio.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <CreatePortfolio />
          </div>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
