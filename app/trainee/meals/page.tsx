"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Check, Info, Plus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock food database with nutrition information
const foodDatabase = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fats: 0.3, servingSize: "1 medium (182g)" },
  { id: 2, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fats: 0.4, servingSize: "1 medium (118g)" },
  { id: 3, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, servingSize: "100g (cooked)" },
  { id: 4, name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fats: 1.8, servingSize: "1 cup cooked (195g)" },
  { id: 5, name: "Salmon", calories: 206, protein: 22, carbs: 0, fats: 13, servingSize: "100g (cooked)" },
  { id: 6, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fats: 0.6, servingSize: "1 cup (91g)" },
  { id: 7, name: "Egg", calories: 72, protein: 6.3, carbs: 0.4, fats: 5, servingSize: "1 large (50g)" },
  {
    id: 8,
    name: "Greek Yogurt",
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0.4,
    servingSize: "170g (plain, non-fat)",
  },
  { id: 9, name: "Avocado", calories: 234, protein: 2.9, carbs: 12, fats: 21, servingSize: "1 medium (150g)" },
  { id: 10, name: "Sweet Potato", calories: 180, protein: 4, carbs: 41, fats: 0.1, servingSize: "1 medium (151g)" },
  { id: 11, name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 2.5, servingSize: "1 cup cooked (234g)" },
  { id: 12, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, servingSize: "100g (raw)" },
  { id: 13, name: "Quinoa", calories: 222, protein: 8, carbs: 39, fats: 3.6, servingSize: "1 cup cooked (185g)" },
  { id: 14, name: "Almonds", calories: 164, protein: 6, carbs: 6, fats: 14, servingSize: "1/4 cup (35g)" },
  { id: 15, name: "Beef Steak", calories: 271, protein: 26, carbs: 0, fats: 18, servingSize: "100g (cooked)" },
]

export default function MealUploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mealType, setMealType] = useState("breakfast")
  const [inputMethod, setInputMethod] = useState("photo")
  const [selectedFoods, setSelectedFoods] = useState<
    Array<{
      id: number
      name: string
      quantity: number
      calories: number
      protein: number
      carbs: number
      fats: number
      servingSize: string
    }>
  >([])
  const [open, setOpen] = useState(false)

  // Manual nutrition input state
  const [nutritionData, setNutritionData] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  })

  // Calculate total nutrition based on selected foods
  useEffect(() => {
    if (selectedFoods.length > 0) {
      const totals = selectedFoods.reduce(
        (acc, food) => {
          const multiplier = food.quantity
          return {
            calories: acc.calories + food.calories * multiplier,
            protein: acc.protein + food.protein * multiplier,
            carbs: acc.carbs + food.carbs * multiplier,
            fats: acc.fats + food.fats * multiplier,
          }
        },
        { calories: 0, protein: 0, carbs: 0, fats: 0 },
      )

      setNutritionData({
        calories: Math.round(totals.calories).toString(),
        protein: Math.round(totals.protein).toString(),
        carbs: Math.round(totals.carbs).toString(),
        fats: Math.round(totals.fats).toString(),
      })
    }
  }, [selectedFoods])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleNutritionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNutritionData({
      ...nutritionData,
      [name]: value,
    })
  }

  const handleFoodSelect = (foodId: number) => {
    const food = foodDatabase.find((f) => f.id === foodId)
    if (food) {
      setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }])
    }
    setOpen(false)
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedFoods(selectedFoods.map((food) => (food.id === id ? { ...food, quantity } : food)))
  }

  const handleRemoveFood = (id: number) => {
    setSelectedFoods(selectedFoods.filter((food) => food.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)

      if (inputMethod === "photo") {
        setIsAnalyzing(true)
        // Simulate analysis
        setTimeout(() => {
          setIsAnalyzing(false)
          setIsComplete(true)
        }, 1500)
      } else {
        setIsComplete(true)
      }
    }, 1500)
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Daily Meal Upload</h1>
        <p className="text-muted-foreground">
          Upload your meal photos for nutrition analysis or enter details manually.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Meal Type</Label>
                <RadioGroup
                  defaultValue="breakfast"
                  className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-4"
                  value={mealType}
                  onValueChange={setMealType}
                >
                  <div>
                    <RadioGroupItem value="breakfast" id="breakfast" className="peer sr-only" />
                    <Label
                      htmlFor="breakfast"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Breakfast</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="lunch" id="lunch" className="peer sr-only" />
                    <Label
                      htmlFor="lunch"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Lunch</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dinner" id="dinner" className="peer sr-only" />
                    <Label
                      htmlFor="dinner"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Dinner</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="snack" id="snack" className="peer sr-only" />
                    <Label
                      htmlFor="snack"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Snack</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-medium">Input Method</Label>
                </div>
                <Tabs defaultValue="photo" className="w-full" value={inputMethod} onValueChange={setInputMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="photo">Photo Upload</TabsTrigger>
                    <TabsTrigger value="manual">Manual Input</TabsTrigger>
                  </TabsList>
                  <TabsContent value="photo" className="mt-4">
                    <div>
                      <Label htmlFor="meal-photo">Meal Photo</Label>
                      <div className="mt-2 flex items-center justify-center w-full">
                        <label
                          htmlFor="meal-photo"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Meal preview"
                              className="h-full w-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
                            </div>
                          )}
                          <Input
                            id="meal-photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="meal-description">Meal Description (Optional)</Label>
                        <Textarea
                          id="meal-description"
                          placeholder="Describe your meal (e.g., ingredients, cooking method)"
                          className="mt-2"
                          rows={2}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="manual" className="mt-4 space-y-4">
                    <div>
                      <Label className="text-base">Food Selection</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Food Item
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start" side="bottom" sideOffset={5}>
                            <Command>
                              <CommandInput placeholder="Search for food..." />
                              <CommandList>
                                <CommandEmpty>No food found.</CommandEmpty>
                                <CommandGroup heading="Common Foods">
                                  {foodDatabase.map((food) => (
                                    <CommandItem
                                      key={food.id}
                                      value={food.name}
                                      onSelect={() => handleFoodSelect(food.id)}
                                    >
                                      <span>{food.name}</span>
                                      <span className="ml-2 text-xs text-muted-foreground">({food.calories} cal)</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {selectedFoods.length > 0 && (
                      <div className="space-y-3 mt-4">
                        <Label>Selected Foods</Label>
                        <div className="space-y-2">
                          {selectedFoods.map((food) => (
                            <div key={food.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex-1">
                                <div className="font-medium">{food.name}</div>
                                <div className="text-xs text-muted-foreground">{food.servingSize}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7 rounded-r-none"
                                    onClick={() => handleQuantityChange(food.id, Math.max(0.5, food.quantity - 0.5))}
                                  >
                                    -
                                  </Button>
                                  <Input
                                    type="number"
                                    value={food.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(food.id, Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="h-7 w-14 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    step={0.5}
                                    min={0.5}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7 rounded-l-none"
                                    onClick={() => handleQuantityChange(food.id, food.quantity + 0.5)}
                                  >
                                    +
                                  </Button>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleRemoveFood(food.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="calories">Calories</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total calories in kcal</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="calories"
                          name="calories"
                          type="number"
                          placeholder="e.g., 450"
                          value={nutritionData.calories}
                          onChange={handleNutritionChange}
                          className={cn(selectedFoods.length > 0 && "bg-muted")}
                          readOnly={selectedFoods.length > 0}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="protein">Protein (g)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total protein in grams</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="protein"
                          name="protein"
                          type="number"
                          placeholder="e.g., 25"
                          value={nutritionData.protein}
                          onChange={handleNutritionChange}
                          className={cn(selectedFoods.length > 0 && "bg-muted")}
                          readOnly={selectedFoods.length > 0}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="carbs">Carbs (g)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total carbohydrates in grams</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="carbs"
                          name="carbs"
                          type="number"
                          placeholder="e.g., 45"
                          value={nutritionData.carbs}
                          onChange={handleNutritionChange}
                          className={cn(selectedFoods.length > 0 && "bg-muted")}
                          readOnly={selectedFoods.length > 0}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="fats">Fats (g)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total fats in grams</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="fats"
                          name="fats"
                          type="number"
                          placeholder="e.g., 15"
                          value={nutritionData.fats}
                          onChange={handleNutritionChange}
                          className={cn(selectedFoods.length > 0 && "bg-muted")}
                          readOnly={selectedFoods.length > 0}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="manual-description">Meal Description</Label>
                      <Textarea
                        id="manual-description"
                        placeholder="Describe your meal (e.g., ingredients, cooking method)"
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  (inputMethod === "photo" && !previewUrl) ||
                  (inputMethod === "manual" && selectedFoods.length === 0 && !nutritionData.calories) ||
                  isUploading ||
                  isAnalyzing ||
                  isComplete
                }
              >
                {isUploading
                  ? "Uploading..."
                  : isAnalyzing
                    ? "Analyzing..."
                    : isComplete
                      ? "Uploaded"
                      : "Upload & Analyze"}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Analysis</CardTitle>
              <CardDescription>
                {inputMethod === "photo"
                  ? "AI-powered nutrition breakdown"
                  : selectedFoods.length > 0
                    ? "Based on selected food items"
                    : "Based on your manual input"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-sm text-muted-foreground">Analyzing your meal...</p>
                </div>
              ) : isComplete ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium text-muted-foreground">Calories</div>
                      <div className="text-2xl font-bold">
                        {inputMethod === "manual" && nutritionData.calories ? nutritionData.calories : "450"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium text-muted-foreground">Protein</div>
                      <div className="text-2xl font-bold">
                        {inputMethod === "manual" && nutritionData.protein ? `${nutritionData.protein}g` : "25g"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium text-muted-foreground">Carbs</div>
                      <div className="text-2xl font-bold">
                        {inputMethod === "manual" && nutritionData.carbs ? `${nutritionData.carbs}g` : "45g"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium text-muted-foreground">Fats</div>
                      <div className="text-2xl font-bold">
                        {inputMethod === "manual" && nutritionData.fats ? `${nutritionData.fats}g` : "15g"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      {inputMethod === "photo" ? "AI Suggestions" : "Nutrition Summary"}
                    </div>
                    <p className="mt-2 text-sm">
                      {inputMethod === "photo"
                        ? "This meal has a good balance of macronutrients. Consider adding more vegetables for additional fiber and micronutrients."
                        : selectedFoods.length > 0
                          ? `This meal contains ${selectedFoods.length} food item${selectedFoods.length > 1 ? "s" : ""} with a good balance of macronutrients. It represents approximately ${Math.round(Number.parseInt(nutritionData.calories) / 20)}% of your daily caloric needs.`
                          : "This meal provides a balanced mix of macronutrients. It represents approximately 20-25% of your daily caloric needs."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Analysis Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {inputMethod === "photo"
                      ? "Upload a meal photo to get an AI-powered nutrition analysis"
                      : "Select food items or enter nutrition information to see your meal analysis"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

