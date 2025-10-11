import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthStackParamList } from '../navigation/AuthStack';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
      general: '',
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.username.trim(), formData.password);

    if (!result.success) {
      setErrors(prev => ({
        ...prev,
        general: result.error || 'Login failed. Please try again.',
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear specific field error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Clear general error
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };


  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to ExtraChill</Text>
          </View>

          <View style={styles.form}>
            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.username ? styles.inputError : null,
                ]}
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                placeholder="Enter your username"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {errors.username ? (
                <Text style={styles.errorText}>{errors.username}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.password ? styles.inputError : null,
                  ]}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? '#666' : '#999'}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Text style={styles.passwordToggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* General Error */}
            {errors.general ? (
              <View style={styles.generalErrorContainer}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            ) : null}

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading ? styles.loginButtonDisabled : null,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Development Note */}
            <View style={styles.devNote}>
              <Text style={styles.devNoteText}>
                Development Mode: Any valid credentials will work
              </Text>
              <Text style={styles.devNoteSubtext}>
                Username: 3+ characters, Password: 6+ characters
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000' : '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? '#ccc' : '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: isDarkMode ? '#111' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  passwordToggleText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
  },
  generalErrorContainer: {
    backgroundColor: isDarkMode ? '#331111' : '#fff5f5',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  generalErrorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  devNote: {
    marginTop: 30,
    padding: 15,
    backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#ddd',
  },
  devNoteText: {
    color: isDarkMode ? '#ccc' : '#666',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  devNoteSubtext: {
    color: isDarkMode ? '#999' : '#888',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  devHint: {
    color: isDarkMode ? '#666' : '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});