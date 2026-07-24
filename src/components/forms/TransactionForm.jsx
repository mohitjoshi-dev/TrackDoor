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
import { useState } from "react";

export default function TransactionForm({ onCancel, onSubmit }) {
const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        notes: "",
      });
  
        const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};   

const handleSubmit = (e) => {
  e.preventDefault();

  onSubmit(formData);
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
          placeholder="₹0.00"
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>

        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              category: value,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="food">🍔 Food</SelectItem>
            <SelectItem value="travel">🚕 Travel</SelectItem>
            <SelectItem value="shopping">🛍 Shopping</SelectItem>
            <SelectItem value="bills">💡 Bills</SelectItem>
            <SelectItem value="income">💰 Income</SelectItem>
          </SelectContent>
        </Select>
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
          Add Transaction
        </button>
      </div>
    </form>
  );
}