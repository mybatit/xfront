'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ChevronDown, ChevronUp } from "lucide-react"

// Define the user type
type User = {
  id: number,
  name: string
}

// Mock user data for demonstration
const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'David Lee' },
  { id: 5, name: 'Emma Watson' },
  { id: 6, name: 'Frank Miller' },
  { id: 7, name: 'Grace Kelly' },
  { id: 8, name: 'Henry Ford' },
  { id: 9, name: 'Ivy Chen' },
  { id: 10, name: 'Jack Robinson' },
]

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]) // Array of User type
  const [showResults, setShowResults] = useState(true)

  const searchResults = useMemo(() => {
    return mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedUsers.some(selectedUser => selectedUser.id === user.id)
    )
  }, [searchQuery, selectedUsers])

  const handleSearch = () => {
    setShowResults(true)
  }

  const addUser = (user: User) => {  // Explicitly typed user
    setSelectedUsers([...selectedUsers, user])
  }

  const removeUser = (userId: number) => {  // Parameter userId is a number
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId))
  }

  const clearAllUsers = () => {
    setSelectedUsers([])
  }

  const toggleResults = () => {
    setShowResults(!showResults)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sélectionnez les Utilisateurs</h1>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          type="text"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} className="bg-black text-white w-full sm:w-auto">Search</Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/2 border rounded-md p-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Search Results:</h2>
            <Button variant="ghost" size="sm" onClick={toggleResults}>
              {showResults ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showResults ? 'Hide' : 'Show'}
            </Button>
          </div>
          {showResults && (
            <div className="max-h-60 overflow-y-auto">
              <ul className="space-y-1">
                {searchResults.map(user => (
                  <li key={user.id} className="flex justify-between items-center">
                    <span>{user.name}</span>
                    <Button variant="outline" size="sm" onClick={() => addUser(user)}>Add</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full sm:w-1/2 border rounded-md p-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Selected Users:</h2>
            <Button variant="destructive" size="sm" onClick={clearAllUsers}>Clear All</Button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <ul className="space-y-1">
              {selectedUsers.map(user => (
                <li key={user.id} className="flex justify-between items-center">
                  <span>{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeUser(user.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
