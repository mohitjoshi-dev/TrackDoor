import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSettings } from "@/context/SettingsContext";
import { useState, useEffect } from "react";
import { categoryData } from "@/constants/categoryData";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

export default function TransactionForm({ onCancel, onSubmit, initialData, mode = "add", }) {
  const { preferences } = useSettings();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      amount: "",
      category: "",
      type: "expense",
      notes: "",
      date: new Date()
    }
  );

  // Moved errors state UP so handleChange can safely reference it
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date
          ? new Date(initialData.date)
          : new Date(),
      });
    }
  }, [initialData]);     
    
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Transaction name is required.";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
      // Added a fallback to prevent the toISOString undefined crash
      date: (formData.date || new Date()).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">  
      
      {/* Transaction Name */}
      <div className="space-y-2">
        <Label htmlFor="title">Transaction Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Grocery Shopping"
        />
        {errors.title && (
        <p className="text-sm text-red-500 mt-1">
          {errors.title}
        </p>
        )}
      </div>  

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder={`${preferences.currency} 0.00`}
        />
        {errors.amount && (
        <p className="text-sm text-red-500 mt-1">
          {errors.amount}
        </p>
        )}
      </div>

      {/*Date Edit*/}
      <div className="space-y-2">
        <Label>Date</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {formData.date ? (
                format(formData.date, "dd MMM yyyy")
              ) : (
                <span>Select date</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  date,
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/*Category */}
      <div className="space-y-2">
        <Label>Category</Label>

        <Select
          value={formData.category}
          onValueChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              category: value,
            }));

            setErrors((prev) => ({
              ...prev,
              category: "",
            }));
          }}
        >
          
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categoryData
              .filter((category) =>
                formData.type === "income"
                  ? category.id === "income"
                  : category.id !== "income"
              )
              .map((category) => {
                const Icon = category.icon;

                return (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-4 w-4"
                        style={{ color: category.color }}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">
            {errors.category}
          </p>
        )}

      </div>
      <div className="space-y-2">
        <Label>Type</Label>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                type: "income",
              }))
            }
            className={`rounded-xl border py-2 font-medium transition-all ${
              formData.type === "income"
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
            }`}
          >
            Income
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                type: "expense",
              }))
            }
            className={`rounded-xl border py-2 font-medium transition-all ${
              formData.type === "expense"
                ? "border-red-500 bg-red-500 text-white"
                : "border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20"
            }`}
          >
            Expense
          </button>
        </div>
      </div>  

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="border-t pt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border px-5 py-2 font-medium transition-all hover:bg-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground transition-all hover:opacity-90"
        >
         {mode === "edit" ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}