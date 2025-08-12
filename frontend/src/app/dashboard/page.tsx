import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function DashboardPage() {
  return (
     <div className="container mx-auto p-4">
        {/* Outer big card */}
      <Card className="p-4 shadow-lg">
        {/* Big card heading + description */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            How to Generate Leads Using Fynelo
          </CardTitle>
          <p className="text-muted-foreground">
            Fynelo simplifies the lead generation process into three clear steps: 
            defining your ideal customers, finding matching companies, and 
            extracting qualified leads — all within one streamlined platform.
          </p>
        </CardHeader>

        {/* Sub-cards */}
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Small Card 1 */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">1. Create the ICPs</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-grow">
                <p className="text-sm text-muted-foreground">
                  Define your Ideal Customer Profiles (ICPs) by specifying 
                  industry, company size, location, and other relevant filters 
                  so Fynelo can target the right prospects.
                </p>
                <div className="flex justify-end mt-4">
                  <Button asChild>
                    <Link href="/dashboard/icp">Start ICP</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Small Card 2 */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">
                  2. Search Companies
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-grow">
                <p className="text-sm text-muted-foreground">
                  Use Fynelo’s advanced search to find companies matching your 
                  ICPs. Apply filters and access enriched company profiles 
                  instantly.
                </p>
                <div className="flex justify-end mt-4">
                  <Button asChild>
                    <Link href="/companies">Find Companies</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Small Card 3 */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">
                  3. Generate Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-grow">
                <p className="text-sm text-muted-foreground">
                  From your selected companies, Fynelo automatically generates 
                  qualified leads with verified contact information — ready for 
                  outreach.
                </p>
                <div className="flex justify-end mt-4">
                  <Button asChild>
                    <Link href="/people">Get Leads</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
