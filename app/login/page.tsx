"use client";

import styles from "./styles.module.css";
import { useState, ChangeEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.bodyContainer}>
        {/* Title */}
        <div className={styles.title}>LOGIN</div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>

        {/* Login <button></button> */}
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
