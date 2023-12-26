import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Modal as RNModal, ActivityIndicator as Loading } from 'react-native';
import { Row } from 'app/design/layout';
import { Task } from 'app/types/tasks';
import { A, P, Text } from 'app/design/typography';
import { Plus, Times, Check } from 'app/design/icons/svgs';
import tasksApiService from 'app/api/tasks';

export function HomeScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const [inputStyle, setInputStyle] = useState({
        borderColor: isDarkTheme ? '#000' : '#fff',
        backgroundColor: isDarkTheme ? '#333333' : '#fff',
        color: isDarkTheme ? '#ffffff' : '#000',
    });

    const [textStyle, setTextStyle] = useState({
        color: isDarkTheme ? '#9e9e9e' : '#69748a',
    });

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await tasksApiService.getTasks();
                setTasks(tasksData);
                setLoading(false);
            } catch (error: any) {
                console.error('Erro ao buscar tarefas:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTaskToggle = async (taskId: number) => {
        setLoading(true);
        try {
            const updatedTask = await tasksApiService.updateTask(taskId, {
                completed: !tasks.find((task) => task.id === taskId)?.completed,
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error: any) {
            console.error('Erro ao atualizar a tarefa:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskDelete = async () => {
        if (selectedTaskId !== null) {
            setLoading(true);
            try {
                await tasksApiService.deleteTask(selectedTaskId);
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
            } catch (error: any) {
                console.error('Erro ao excluir a tarefa:', error);
            } finally {
                setLoading(false);
                setConfirmationModalVisible(false);
                setSelectedTaskId(null);
            }
        }
    };

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) {
            setErrorMessage('Digite um título para a nova tarefa.');
            setErrorModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const newTask = await tasksApiService.createTask({
                title: newTaskTitle,
                completed: false,
            });
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
        } catch (error: any) {
            console.error('Erro ao criar nova tarefa:', error);
            if (error.response && error.response.status === 500) {
                setErrorMessage('Ocorreu um erro ao criar a tarefa. Tente novamente mais tarde.');
                setErrorModalVisible(true);
            } else {
                setErrorMessage('Verifique sua conexão com a internet.');
                setErrorModalVisible(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleThemeSwitch = () => {
        setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    };

    useEffect(() => {
        setInputStyle({
            borderColor: isDarkTheme ? '#3a3a3a' : '#bbc2ce',
            backgroundColor: isDarkTheme ? '#333333' : '#fff',
            color: isDarkTheme ? '#ffffff' : '#000',
        });
        setTextStyle({
            color: isDarkTheme ? '#9e9e9e' : '#69748a',
        });
    }, [isDarkTheme]);

    return (
        <ScrollView
            style={{ backgroundColor: isDarkTheme ? '#111111' : '#ffffff', padding: 20 }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <View style={{
                width: '100%',
                flexDirection: 'row',
                margin: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    width: '100%',
                    height: 64,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDarkTheme ? '#222222' : '#E3E5E8FF',
                    borderRadius: 5,
                }}>
                    <Text style={{ fontWeight: '500', fontSize: 24, color: isDarkTheme ? '#ffffff' : '#393E4B' }}>
                        LISTA DE TAREFAS
                    </Text>
                    <Text style={{ fontSize: 14, color: isDarkTheme ? '#9e9e9e' : '#69748a' }} >
                        ⚙️ React Native + Next.js
                    </Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: isDarkTheme ? '#222222' : '#E3E5E8FF', padding: 10, borderRadius: 5, marginLeft: 10, height: 64, alignItems: 'center', justifyContent: 'center' }}>
                    <Text onPress={handleThemeSwitch} style={{ fontSize: 24, width: 64, textAlign: 'center' }}>
                        {isDarkTheme ? '🔆' : '🌙' }
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                margin: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        padding: 10,
                        paddingHorizontal: 30,
                        borderRadius: 5,
                        borderWidth: 1,
                        ...inputStyle,
                    }}
                    placeholder=". . ."
                    value={newTaskTitle}
                    onChangeText={(text) => setNewTaskTitle(text)}
                />
                <TouchableOpacity onPress={handleAddTask} style={{ backgroundColor: isDarkTheme ? '#333333' : '#69748a', padding: 10, borderRadius: 5, marginLeft: 10 }}>
                    <Plus color={isDarkTheme ? '#69748a' : '#ffffff'} />
                </TouchableOpacity>
            </View>
            {loading ? (
                <View style={{ height: 420, alignItems: 'center', justifyContent: 'center'}}>
                    <Loading color={isDarkTheme ? '#ffffff' : '#69748a'} />
                </View>
            ) : (
                <>
                    {tasks.length > 0 ? (
                        <>
                            {tasks.map((task) => (
                                <View
                                    key={task.id}
                                    style={{
                                        width: '100%',
                                        margin: 15,
                                        padding: 15,
                                        backgroundColor: task.completed ? 'rgba(1,252,118,0.25)' : isDarkTheme ? '#333333' : '#f9f9f9',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: task.completed ? 'rgba(1,252,118,0.5)' : isDarkTheme ? '#666666' : '#ddd',
                                    }}
                                >
                                    <Row style={{ padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View>
                                            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 5, marginRight: 10, borderWidth: 1, borderColor: '#007BFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => handleTaskToggle(task.id)}>
                                                {task.completed && (
                                                    <Check color="#007BFF"/>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 25 }}>
                                            <Text style={{ fontWeight: '500', fontSize: 18, color: isDarkTheme ? '#ffffff' : '#393e4b' }}>{ task.title }</Text>
                                        </View>
                                        <View style={{  alignItems: "center", justifyContent: "flex-end", paddingRight: 25 }}>
                                            <TouchableOpacity onPress={() => {
                                                setSelectedTaskId(task.id);
                                                setConfirmationModalVisible(true);
                                            }}>
                                                <Times color={isDarkTheme ? '#ffffff' : '#69748a'} />
                                            </TouchableOpacity>
                                        </View>
                                    </Row>
                                </View>
                            ))}
                        </>
                    ) : (
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: isDarkTheme ? '#9e9e9e' : '#69748a', fontSize: 16 }}>Nenhuma tarefa registrada.</Text>
                        </View>
                    )}
                </>
            )}
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'baseline', marginBottom: 40, ...textStyle }}>
                <P style={{ color: '#737373FF' }}>
                    made with&nbsp;
                    <A style={{ fontWeight: '500' }}
                        href="https://solito.dev"
                        hrefAttrs={{
                            target: '_blank',
                            rel: 'noreferrer',
                        }}
                    >Solito&nbsp;</A>
                </P>
                <P style={{ color: '#737373FF', fontWeight: '200' }}>by&nbsp;</P>
                <A style={{ fontWeight: '400' }}
                    href="https://manzoli.dev"
                    hrefAttrs={{
                        target: '_blank',
                        rel: 'noreferrer',
                    }}
                >manzoli.dev</A>
            </View>

            <RNModal
                animationType="fade"
                transparent={true}
                visible={confirmationModalVisible}
                onRequestClose={() => setConfirmationModalVisible(!confirmationModalVisible)}
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.32)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
                        <Text style={{ fontSize: 16 }}>Deseja realmente excluir esta tarefa?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => setConfirmationModalVisible(false)}>
                                <Text style={{ color: '#007BFF' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTaskDelete}>
                                <Text style={{ color: 'red' }}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>

            <RNModal
                animationType="fade"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(!errorModalVisible)}
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.32)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => setErrorModalVisible(false)}>
                            <Times color="#69748a" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16 }}>{errorMessage}</Text>
                    </View>
                </View>
            </RNModal>

        </ScrollView>
    );
}
