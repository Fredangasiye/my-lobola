import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Users, GraduationCap, Home, Coins, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { calculatorFormSchema, type CalculatorFormData, type CalculationResult } from "@shared/schema";

interface CalculatorFormProps {
  onCalculationComplete: (results: CalculationResult) => void;
}

export default function CalculatorForm({ onCalculationComplete }: CalculatorFormProps) {
  const { toast } = useToast();
  
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      culturalGroup: "",
      education: "",
      employment: "",
      familyType: "",
      location: "",
      income: "",
    },
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: CalculatorFormData) => {
      const response = await apiRequest("POST", "/api/calculate", data);
      return response.json() as Promise<CalculationResult>;
    },
    onSuccess: (results) => {
      onCalculationComplete(results);
      toast({
        title: "Calculation Complete",
        description: "Your cultural guidance results are ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Calculation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CalculatorFormData) => {
    calculateMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Cultural Group Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="text-warm-orange mr-3" />
            Cultural Heritage
          </h2>
          <FormField
            control={form.control}
            name="culturalGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cultural Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                      <SelectValue placeholder="Select your cultural group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zulu">Zulu</SelectItem>
                    <SelectItem value="xhosa">Xhosa</SelectItem>
                    <SelectItem value="tswana">Tswana</SelectItem>
                    <SelectItem value="sotho">Sotho</SelectItem>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="tsonga">Tsonga</SelectItem>
                    <SelectItem value="ndebele">Ndebele</SelectItem>
                    <SelectItem value="pedi">Pedi</SelectItem>
                    <SelectItem value="swazi">Swazi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Different cultural groups have varying traditions and customs</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Education & Career */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="text-warm-orange mr-3" />
            Education & Career
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matric">Matric</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="degree">Bachelor's Degree</SelectItem>
                      <SelectItem value="honours">Honours</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD/Doctorate</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="employment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Family & Location */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Home className="text-warm-orange mr-3" />
            Family & Location
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="familyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3">Family Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="nuclear" id="nuclear" className="text-warm-orange" />
                        <label htmlFor="nuclear" className="text-sm cursor-pointer">Nuclear Family</label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="extended" id="extended" className="text-warm-orange" />
                        <label htmlFor="extended" className="text-sm cursor-pointer">Extended Family</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3">Location Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="rural" id="rural" className="text-warm-orange" />
                        <label htmlFor="rural" className="text-sm cursor-pointer">Rural</label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="township" id="township" className="text-warm-orange" />
                        <label htmlFor="township" className="text-sm cursor-pointer">Township</label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="suburb" id="suburb" className="text-warm-orange" />
                        <label htmlFor="suburb" className="text-sm cursor-pointer">Suburb</label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-cream transition-colors">
                        <RadioGroupItem value="city" id="city" className="text-warm-orange" />
                        <label htmlFor="city" className="text-sm cursor-pointer">City Center</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Income Range */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Coins className="text-warm-orange mr-3" />
            Income Information
          </h2>
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Income Range (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under-5000">Under R5,000</SelectItem>
                    <SelectItem value="5000-10000">R5,000 - R10,000</SelectItem>
                    <SelectItem value="10000-20000">R10,000 - R20,000</SelectItem>
                    <SelectItem value="20000-35000">R20,000 - R35,000</SelectItem>
                    <SelectItem value="35000-50000">R35,000 - R50,000</SelectItem>
                    <SelectItem value="50000-plus">R50,000+</SelectItem>
                    <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">This information helps provide culturally appropriate guidance</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Calculate Button */}
        <Button 
          type="submit" 
          className="w-full bg-warm-orange hover:bg-orange-600 text-white font-semibold py-4 px-6 shadow-lg transition-colors duration-200"
          disabled={calculateMutation.isPending}
        >
          <Calculator className="mr-2 h-4 w-4" />
          {calculateMutation.isPending ? "Calculating..." : "Calculate Cultural Guidance"}
        </Button>
      </form>
    </Form>
  );
}
