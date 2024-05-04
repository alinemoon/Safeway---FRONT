import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PerfilScreen = () => {
    const initialValues = {
        nome: "João da Silva",
        email: "joao@example.com",
        telefone: "(11) 1234-5678"
    };

    const [fields, setFields] = useState(initialValues);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldsChanged, setFieldsChanged] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const redefinirSenha = () => {
        setShowPasswordResetForm(!showPasswordResetForm);
        setErrorMessage('');
        checkFields();
    };

    const checkFields = () => {
        setFieldsChanged(true);
    };

    const salvarNovaSenha = () => {
        if (!fieldsChanged) {
            return;
        }

        if (senhaAtual !== 'senha123') {
            setErrorMessage('Senha atual incorreta.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErrorMessage('As novas senhas não coincidem.');
            return;
        }

        console.log('Nova senha:', novaSenha);
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
        setErrorMessage('');
        setShowPasswordResetForm(false);
        setFieldsChanged(false);
        setEditMode(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const salvarPerfil = () => {
        const camposEditados = {};

        if (fields.nome !== initialValues.nome) {
            camposEditados.nome = fields.nome;
        }
        if (fields.email !== initialValues.email) {
            camposEditados.email = fields.email;
        }
        if (fields.telefone !== initialValues.telefone) {
            camposEditados.telefone = fields.telefone;
        }

        console.log('Campos editados:', camposEditados);

        setFieldsChanged(false);
        setEditMode(false);
    };
    const cancelarEdicao = () => {
        setFields(initialValues);
        setFieldsChanged(false);
        setEditMode(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Perfil do Usuário</Text>
            <View style={styles.profileImageContainer}>
                <FontAwesome name="user-circle" size={150} color="#ccc" />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.nome}
                    onChangeText={value => {
                        setFields({ ...fields, nome: value });
                        checkFields();
                    }}
                    editable={editMode}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.email}
                    onChangeText={value => {
                        setFields({ ...fields, email: value });
                        checkFields();
                    }}
                    editable={editMode}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.telefone}
                    onChangeText={value => {
                        setFields({ ...fields, telefone: value });
                        checkFields();
                    }}
                    editable={editMode}
                />
            </View>
            {editMode ? (
                <View style={styles.buttonGroup}>
                    <Button
                        title="Salvar Perfil"
                        onPress={salvarPerfil}
                    />
                    <Button
                        title="Cancelar"
                        onPress={cancelarEdicao}
                        color="red"
                    />
                </View>
            ) : (
                <View style={styles.formGroup}>
                    <Button
                        title="Editar Perfil"
                        onPress={toggleEditMode}
                    />
                </View>
            )}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value="******"
                    editable={false}
                />
                <Button
                    title={showPasswordResetForm ? 'Cancelar' : 'Redefinir Senha'}
                    onPress={redefinirSenha}
                />
            </View>
            {showPasswordResetForm && (
                <View style={styles.passwordResetForm}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Senha Atual:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nova Senha:</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showNovaSenha}
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                            />
                            <TouchableOpacity onPress={() => setShowNovaSenha(!showNovaSenha)}>
                                <FontAwesome name={showNovaSenha ? 'eye-slash' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Repetir Senha:</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showConfirmarSenha}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
                                <FontAwesome name={showConfirmarSenha ? 'eye-slash' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Button
                            title="Salvar senha"
                            onPress={salvarNovaSenha}
                            disabled={!fieldsChanged}
                        />
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
        width: '80%',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#28a745',
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f8f9fa',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f8f9fa',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
});

export default PerfilScreen;
