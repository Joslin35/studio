import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, Recycle, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DashboardChart } from '@/components/dashboard-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to your EcoGenius Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your personalized hub for sustainable living.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eco Suggestions
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">Get Smart Tips</div>
            <p className="text-xs text-muted-foreground mt-1">
              Personalized AI suggestions to reduce your impact.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/suggestions">Generate Ideas</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Green Alternatives
            </CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">Find Swaps</div>
            <p className="text-xs text-muted-foreground mt-1">
              Discover eco-friendly products and services.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/alternatives">Find Alternatives</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Energy Tracking
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">Track Usage</div>
            <p className="text-xs text-muted-foreground mt-1">
              Manually log and visualize your energy consumption.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/tracking">Track Energy</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <DashboardChart />
      </div>
    </div>
  );
}
