import { useEffect, useState } from "react";
import { useBudgets } from "@/context/BudgetsContext";
import { categoryData } from "@/constants/categoryData";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BudgetForm({
  open,
  onOpenChange,
  editingBudget,
}) {
  const { addBudget, updateBudget } = useBudgets();

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (editingBudget) {
      setCategory(editingBudget.category);
      setLimit(editingBudget.limit);
    } else {
      setCategory("");
      setLimit("");
    }
  }, [editingBudget]);

  const handleSubmit = () => {
    if (!category || !limit) return;

    try {
      const budget = {
        category,
        limit: Number(limit),
      };

      if (editingBudget) {
        updateBudget(editingBudget.id, budget);
      } else {
        addBudget(budget);
      }

      onOpenChange(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingBudget
              ? "Edit Budget"
              : "Add Budget"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>

              <SelectContent>
                {categoryData
                  .filter(
                    (item) => item.id !== "income"
                  )
                  .map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Monthly Limit
            </label>

            <Input
              type="number"
              placeholder="5000"
              value={limit}
              onChange={(e) =>
                setLimit(e.target.value)
              }
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            {editingBudget
              ? "Save Changes"
              : "Add Budget"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}