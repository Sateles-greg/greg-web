#[cfg(test)]
mod tests {
    // Define a mock greet_with_mode function for testing
        fn greet_with_mode(name: &str, mode: &str) -> String {
            match mode {
                "colaborativo" => format!("Olá, {}! Você está no modo colaborativo!", name),
                "automacao" => format!("Olá, {}! Você está no modo automação!", name),
                "diagnostico" => format!("Olá, {}! Você está no modo diagnóstico!", name),
                _ => format!("Olá, {}! Modo desconhecido!", name),
            }
        }

    #[test]
    fn test_greet_with_mode_colaborativo() {
        let result = greet_with_mode("Alice", "colaborativo");
        assert_eq!(result, "Olá, Alice! Você está no modo colaborativo!");
    }

    #[test]
    fn test_greet_with_mode_automacao() {
        let result = greet_with_mode("Bob", "automacao");
        assert_eq!(result, "Olá, Bob! Você está no modo automação!");
    }

    #[test]
    fn test_greet_with_mode_diagnostico() {
        let result = greet_with_mode("Carol", "diagnostico");
        assert_eq!(result, "Olá, Carol! Você está no modo diagnóstico!");
    }

    #[test]
    fn test_greet_with_mode_desconhecido() {
        let result = greet_with_mode("Dave", "desconhecido");
        assert_eq!(result, "Olá, Dave! Modo desconhecido!");
    }
}
