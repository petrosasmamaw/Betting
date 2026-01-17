import supabase from '../config/supabase.js';
import cookie from 'cookie';

/**
 * COOKIE OPTIONS
 * sameSite: 'none'  → REQUIRED for cross-site (frontend ≠ backend)
 * secure: true      → REQUIRED for HTTPS (production)
 */
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,          // MUST be true in production
  sameSite: 'none',      // REQUIRED for cross-site cookies
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/* =REGISTER===*/
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Registered successfully. Check your email to verify your account.',
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

/* =LOGIN===*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Store access token in HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sb_token', data.session.access_token, COOKIE_OPTIONS)
    );

    res.json({
      message: 'Login successful',
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

/* =LOGOUT===*/
export const logout = async (req, res) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sb_token', '', {
        ...COOKIE_OPTIONS,
        expires: new Date(0), // Immediately delete cookie
      })
    );

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

/* =GET ACTIVE SESSION===*/
export const getSession = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.sb_token;

    if (!token) {
      return res.status(401).json({ error: 'No active session' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    res.json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get session' });
  }
};

/* =FORGOT PASSWORD===*/ 

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send reset email' });
  }
};
