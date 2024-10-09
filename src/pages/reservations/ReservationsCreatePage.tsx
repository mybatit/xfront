import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

export default function ReservationsCreatePage() {
  const [formData, setFormData] = useState({
    description: "",
    account_id: 1,
    reservationstypes_id: 1,
    vehicle_id: 1,
    user_id: [1, 2, 3],
    date_start: "",
    date_end: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col ">
      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* aside */}
        <aside className="w-full lg:w-64 bg-gray-100 p-4">
          <h3 className="font-bold mb-2">Recherche Reservation</h3>
          <Link to="/reservations">
            <Button className="w-full" variant="outline">
              Reservations
            </Button>
          </Link>

          <div>
            <h3 className="mb-2 font-medium">Export</h3>
            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              Exporter
            </Button>
          </div>
        </aside>
        <main className="w-full flex-1 p-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full  mx-auto p-4"
          >
            <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="account_id"
                className="block text-sm font-medium mb-1"
              >
                Account ID
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("account_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="reservationstypes_id"
                className="block text-sm font-medium mb-1"
              >
                Reservation Type ID
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("reservationstypes_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reservation type ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="vehicle_id"
                className="block text-sm font-medium mb-1"
              >
                Vehicle ID
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("vehicle_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="date_start"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <Input
                type="datetime-local"
                id="date_start"
                name="date_start"
                value={formData.date_start}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="date_end"
                className="block text-sm font-medium mb-1"
              >
                End Date
              </label>
              <Input
                type="datetime-local"
                id="date_end"
                name="date_end"
                value={formData.date_end}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Reservation
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
