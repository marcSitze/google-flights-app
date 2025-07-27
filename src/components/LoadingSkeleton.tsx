import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-center">
                      <div className="w-12 h-6 bg-gray-200 rounded mb-1"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-2"></div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-6 bg-gray-200 rounded mb-1"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-center">
                      <div className="w-12 h-6 bg-gray-200 rounded mb-1"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-2"></div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-6 bg-gray-200 rounded mb-1"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end space-y-2">
                <div className="w-16 h-8 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
