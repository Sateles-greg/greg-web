// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

pub fn greet_with_mode_logic(name: &str, mode: &str) -> String {
    match mode {
        "colaborativo" => format!("Olá, {}! Você está no modo colaborativo!", name),
        "automacao" => format!("Olá, {}! Você está no modo automação!", name),
        "diagnostico" => format!("Olá, {}! Você está no modo diagnóstico!", name),
        _ => format!("Olá, {}! Modo desconhecido!", name),
    }
}

pub fn greet_with_mode(name: &str, mode: &str) -> String {
    greet_with_mode_logic(name, mode)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::greet_with_mode_logic as greet_with_mode; // Importa diretamente do módulo atual

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
