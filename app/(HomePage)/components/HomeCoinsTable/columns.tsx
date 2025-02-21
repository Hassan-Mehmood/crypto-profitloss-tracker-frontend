import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export interface HomeTableType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export type HomeTableData = HomeTableType[];

export const columns: ColumnDef<HomeTableType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Coin
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={50}
          height={50}
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "current_price",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "market_cap",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Market Cap
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "price_change_percentage_1h_in_currency",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1h
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "price_change_percentage_24h_in_currency",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            24h
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "price_change_percentage_7d_in_currency",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            7d
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "total_volume",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Volume
          </Button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "symbol",
  //   header: "Symbol",
  // },
  // {
  //   accessorKey: "market_cap_rank",
  //   header: "Market Cap Rank",
  // },
  // {
  //   accessorKey: "fully_diluted_valuation",
  //   header: "Fully Diluted Valuation",
  // },
  // {
  //   accessorKey: "high_24h",
  //   header: "High 24h",
  // },
  // {
  //   accessorKey: "low_24h",
  //   header: "Low 24h",
  // },
  // {
  //   accessorKey: "price_change_24h",
  //   header: "24h",
  // },
  // {
  //   accessorKey: "price_change_percentage_24h",
  //   header: "24h",
  // },
  // {
  //   accessorKey: "market_cap_change_24h",
  //   header: "Market Cap Change 24h",
  // },
  // {
  //   accessorKey: "market_cap_change_percentage_24h",
  //   header: "Market Cap Change Percentage 24h",
  // },
  // {
  //   accessorKey: "circulating_supply",
  //   header: "Circulating Supply",
  // },
  // {
  //   accessorKey: "total_supply",
  //   header: "Total Supply",
  // },
  // {
  //   accessorKey: "max_supply",
  //   header: "Max Supply",
  // },
  // {
  //   accessorKey: "ath",
  //   header: "ATH",
  // },
  // {
  //   accessorKey: "ath_change_percentage",
  //   header: "ATH Change Percentage",
  // },
  // {
  //   accessorKey: "ath_date",
  //   header: "ATH Date",
  // },
  // {
  //   accessorKey: "atl",
  //   header: "ATL",
  // },
  // {
  //   accessorKey: "atl_change_percentage",
  //   header: "ATL Change Percentage",
  // },
  // {
  //   accessorKey: "atl_date",
  //   header: "ATL Date",
  // },
  // {
  //   accessorKey: "roi",
  //   header: "ROI",
  // },
  // {
  //   accessorKey: "last_updated",
  //   header: "Last Updated",
  // },
];
