import React from 'react'

export default function Footer() {
  return (
    <footer className="text-white py-4">
      <div className="container mx-auto text-center font-space-grotesk">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Anthony Malang. All rights reserved.
          <span className="ml-2">
            <a href="https://github.com/junebugtony" className="hover:underline">
              Github
            </a>
          </span>
        </p>
      </div>
    </footer>
  )
}