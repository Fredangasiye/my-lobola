import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Users, GraduationCap, Home, Coins, Calculator, User, Heart } from "lucide-react";
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
      age: "",
      socialStanding: "",
      numberOfChildren: "",
      virginityStatus: "",
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
            Bride's Cultural Heritage
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
                    <SelectItem value="pedi">Pedi (Northern Sotho)</SelectItem>
                    <SelectItem value="tswana">Tswana</SelectItem>
                    <SelectItem value="sotho">Sotho</SelectItem>
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
            Bride's Education & Career
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

        {/* Additional Bride Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <User className="text-warm-orange mr-3" />
            Additional Bride Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bride's Age</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="18-22">18-22 years</SelectItem>
                      <SelectItem value="23-27">23-27 years</SelectItem>
                      <SelectItem value="28-32">28-32 years</SelectItem>
                      <SelectItem value="33-37">33-37 years</SelectItem>
                      <SelectItem value="38-plus">38+ years</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialStanding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bride's Family Social Standing</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select social standing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="working-class">Working Class</SelectItem>
                      <SelectItem value="middle-class">Middle Class</SelectItem>
                      <SelectItem value="upper-middle-class">Upper Middle Class</SelectItem>
                      <SelectItem value="prominent-family">Prominent Family</SelectItem>
                      <SelectItem value="traditional-leaders">Traditional Leaders</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Children</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select number of children" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="one">1 child</SelectItem>
                      <SelectItem value="two">2 children</SelectItem>
                      <SelectItem value="three">3 children</SelectItem>
                      <SelectItem value="four-plus">4+ children</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="virginityStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Virginity Status (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                        <SelectValue placeholder="Select status (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">This is optional and based on personal choice</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Bride's Family & Location */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Home className="text-warm-orange mr-3" />
            Bride's Family & Location
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
            Groom's Income Information
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
          className="w-full bg-orange-600 hover:bg-orange-700 border-2 border-orange-800 text-white font-semibold py-4 px-6 shadow-lg transition-colors duration-200"
          disabled={calculateMutation.isPending}
        >
          <Calculator className="mr-2 h-4 w-4" />
          {calculateMutation.isPending ? "Calculating..." : "Calculate Lobola Price"}
        </Button>
      </form>
    </Form>
  );
}
